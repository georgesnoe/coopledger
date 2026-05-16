import { prisma } from "@/utils/prisma";
import * as WhatsAppService from "@/services/whatsapp.service";
import { on } from "@/utils/events";

const CONCURRENCY = 5;

async function chunkedPool<T>(
  items: T[],
  size: number,
  fn: (item: T) => Promise<unknown>,
): Promise<PromiseSettledResult<unknown>[]> {
  const results: PromiseSettledResult<unknown>[] = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    await Promise.allSettled(
      chunk.map((item) =>
        fn(item).then(
          (v) => results.push({ status: "fulfilled" as const, value: v }),
          (r) => results.push({ status: "rejected" as const, reason: r }),
        ),
      ),
    );
  }
  return results;
}

async function notifyCooperativeMembers(
  cooperativeId: string,
  buildMessage: (cooperativeName: string) => string,
) {
  try {
    const members = await prisma.memberships.findMany({
      where: { cooperativeId, status: "ACCEPTED" },
      include: { cooperative: true, user: true },
    });

    if (members.length === 0) return;

    const message = buildMessage(members[0].cooperative.name);

    const results = await chunkedPool(
      members,
      CONCURRENCY,
      (m) => WhatsAppService.sendWhatsAppMessage(m.user.email.split("@")[0], message),
    );

    for (const r of results) {
      if (r.status === "rejected") {
        console.error("[Notifications] Send failed:", r.reason);
      }
    }
  } catch (error) {
    console.error("[Notifications] Error notifying members:", error);
  }
}

export function setupNotificationHandlers() {
  on("vote.proposed", ({ voteId, cooperativeId }) => {
    notifyCooperativeMembers(
      cooperativeId,
      (name) =>
        `📢 *Nouveau vote disponible !*\n\n` +
        `🏛️ *Coopérative:* ${name}\n` +
        `🆔 Vote n°${voteId.slice(0, 8)}\n\n` +
        `👉 Veuillez consulter l'application CoopLedger pour voter.`,
    );
  });

  on("vote.approved", ({ voteId, cooperativeId, subject }) => {
    notifyCooperativeMembers(
      cooperativeId,
      (name) =>
        `✅ *Vote approuvé !*\n\n` +
        `🏛️ *Coopérative:* ${name}\n` +
        `📌 *Sujet:* ${subject}\n` +
        `🆔 Vote n°${voteId.slice(0, 8)}\n\n` +
        `La proposition a été adoptée. Consultez l'application CoopLedger pour plus de détails.`,
    );
  });

  on("vote.expired", ({ voteId, cooperativeId, subject }) => {
    notifyCooperativeMembers(
      cooperativeId,
      (name) =>
        `⏰ *Vote expiré !*\n\n` +
        `🏛️ *Coopérative:* ${name}\n` +
        `📌 *Sujet:* ${subject}\n` +
        `🆔 Vote n°${voteId.slice(0, 8)}\n\n` +
        `Le vote est maintenant clos. Consultez l'application CoopLedger pour voir les résultats.`,
    );
  });
}
