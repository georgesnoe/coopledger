import type { Request, Response } from "express";
import { VoteStatus, type VoteType } from "@/db/enums";
import * as WhatsAppService from "@/services/whatsapp.service";
import { prisma } from "@/utils/prisma";

export async function proposeVote(req: Request, res: Response) {
  const {
    subject,
    description,
    proposals,
    endDate,
    type,
    cooperativeId,
    amount,
    beneficiary,
    paymentDeadline,
  } = req.body;

  if (!subject || !proposals || !endDate || !type || !cooperativeId) {
    return res
      .status(400)
      .json({ message: "Les champs obligatoires ne sont pas renseignés" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Vérifier que l'auteur est membre du bureau
      const membership = await tx.memberships.findUnique({
        where: {
          userId_cooperativeId: { userId: req.user.id, cooperativeId },
        },
      });

      if (
        !membership ||
        (membership.grade !== "ADMIN" && membership.grade !== "TREASURER")
      ) {
        return res
          .status(403)
          .json({ message: "Seul le bureau peut proposer un vote" });
      }

      // 2. Snapshot du nombre de votants éligibles (ACCEPTED)
      const voterCount = await tx.memberships.count({
        where: { cooperativeId, status: "ACCEPTED" },
      });

      const vote = await tx.votes.create({
        data: {
          subject: subject as string,
          description: description as string,
          proposals: proposals as string[],
          endDate: new Date(endDate),
          type: type as VoteType,
          cooperativeId,
          amount: amount ? Number(amount) : null,
          beneficiary: beneficiary as string,
          paymentDeadline: paymentDeadline ? new Date(paymentDeadline) : null,
          totalEligibleVoters: voterCount,
          creatorId: req.user.id,
        },
      });

      res.status(201).json(vote);
    });

    // Notification WhatsApp (After transaction to ensure vote exists)
    try {
      const members = await prisma.memberships.findMany({
        where: { cooperativeId, status: "ACCEPTED" },
        include: { user: true },
      });

      const message =
        `📢 *Nouveau vote disponible !*\n\n` +
        `📌 *Sujet:* ${subject}\n` +
        `${description ? `📝 *Description:* ${description}\n` : ""}` +
        `📅 *Date limite:* ${new Date(endDate).toLocaleDateString("fr-FR")}\n` +
        `${amount ? `💰 *Montant:* ${amount} FCFA\n` : ""}` +
        `👉 Veuillez consulter l'application CoopLedger pour voter.`;

      await Promise.all(
        members.map((m) => {
          // extract phone from email: user@example.com -> user
          // user is expected to be the phone number as per the account creation logic provided by user
          const phone = m.user.email.split("@")[0];
          return WhatsAppService.sendWhatsAppMessage(phone, message);
        }),
      );
    } catch (notifError) {
      console.error("WhatsApp Notification Error:", notifError);
      // We don't fail the request if notifications fail
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}

export async function castVote(req: Request, res: Response) {
  const { voteId, choiceIndex } = req.body;

  if (!voteId || choiceIndex === undefined) {
    return res.status(400).json({ message: "ID de vote ou choix manquant" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const vote = await tx.votes.findUnique({
        where: { id: voteId },
        include: { _count: { select: { VoteCasts: true } } },
      });

      if (!vote || vote.status !== VoteStatus.OPEN) {
        return res.status(404).json({ message: "Le vote n'est pas ouvert" });
      }

      // Vérifier l'adhésion
      const membership = await tx.memberships.findUnique({
        where: {
          userId_cooperativeId: {
            userId: req.user.id,
            cooperativeId: vote.cooperativeId,
          },
        },
      });

      if (!membership || membership.status !== "ACCEPTED") {
        return res.status(403).json({
          message: "Vous n'êtes pas membre actif de cette coopérative",
        });
      }

      // Enregistrer le vote et mettre à jour l'activité
      const voteCast = await tx.voteCasts.create({
        data: {
          voteId: voteId,
          userId: req.user.id,
          choiceIndex: choiceIndex,
        },
      });

      await tx.memberships.update({
        where: {
          userId_cooperativeId: {
            userId: req.user.id,
            cooperativeId: vote.cooperativeId,
          },
        },
        data: { lastActiveAt: new Date() },
      });

      // Clôture automatique si 100% de participation
      if (vote._count.VoteCasts + 1 >= vote.totalEligibleVoters) {
        // Calcul du gagnant
        const allCasts = await tx.voteCasts.findMany({
          where: { voteId: voteId },
        });

        const counts = allCasts.reduce((acc: any, cast: any) => {
          acc[cast.choiceIndex] = (acc[cast.choiceIndex] || 0) + 1;
          return acc;
        }, {});

        const winningChoice = Object.keys(counts).reduce((a, b) =>
          counts[Number(a)] > counts[Number(b)] ? a : b,
        );

        // Si c'est un vote général, on approuve si la majorité a voté pour une option
        // Pour le MVP, on marque comme APPROVED et on pourrait stocker le winningChoice dans un nouveau champ
        await tx.votes.update({
          where: { id: voteId },
          data: { status: VoteStatus.APPROVED },
        });
      }

      res.status(201).json(voteCast);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }

  return res.end();
}
