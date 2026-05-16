import { env } from "@/config/env";

const WHATSAPP_TIMEOUT = 10_000;

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("228")) return digits;
  return `228${digits}`;
}

function deviceHeaders(): Record<string, string> {
  if (!env.GOWA_API_DEVICE_ID) return {};
  return { "X-Device-Id": env.GOWA_API_DEVICE_ID };
}

async function fetchWithTimeout(
  url: URL,
  options: RequestInit & { body?: string },
  ms: number,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function sendMessage(to: string, bodyFields: Record<string, unknown>) {
  const phone = formatPhone(to);
  const gowaPhone = `${phone}@s.whatsapp.net`;
  const payload = { phone: gowaPhone, ...bodyFields };
  const body = JSON.stringify(payload);

  console.log("[WhatsApp] sending ->", gowaPhone);

  const res = await fetchWithTimeout(
    new URL("/send/message", env.GOWA_API_URL),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(env.GOWA_API_BASIC_AUTH).toString("base64")}`,
        ...deviceHeaders(),
      },
      body,
    },
    WHATSAPP_TIMEOUT,
  );

  const text = await res.text();
  console.log("[WhatsApp] response", res.status, text.slice(0, 300));
  return res;
}

export const sendWhatsAppOTP = async (to: string, code: string) => {
  const phone = formatPhone(to);
  return sendMessage(to, {
    message: `Votre code CoopLedger est ${code}`,
    mentions: [phone],
  });
};

export const sendWhatsAppMessage = async (to: string, message: string) => {
  return sendMessage(to, { message });
};
