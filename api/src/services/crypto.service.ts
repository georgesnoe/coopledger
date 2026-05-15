import { createCipheriv, createDecipheriv, randomBytes, createHash } from "node:crypto";
import { env } from "@/config/env";

const ALGORITHM = env.ALGORITHM;
const ENCRYPTION_KEY = createHash("sha256").update(env.ENCRYPTION_KEY).digest("hex");

export const encrypt = (text: string): string => {
  const iv = randomBytes(12);
  const cipher: any = createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (text: string): string => {
  const [ivHex, tagHex, encryptedHex] = text.split(":");
  if (!ivHex || !tagHex || !encryptedHex) throw new Error("Format de clé invalide");

  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher: any = createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

/**
 * Chiffre des données (Buffer ou String) avec une clé spécifique.
 * Utilisé pour les documents de coopérative et les reçus.
 */
export function encryptWithKey(data: Buffer | string, hexKey: string) {
  const iv = randomBytes(12);
  const key = Buffer.from(hexKey, "hex");
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
}

/**
 * Déchiffre des données avec une clé spécifique.
 */
export function decryptWithKey(
  encryptedData: Buffer,
  hexKey: string,
  ivHex: string,
  tagHex: string,
) {
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const key = Buffer.from(hexKey, "hex");

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);
  return decrypted;
}

/**
 * Génère une nouvelle clé AES-256.
 */
export function generateCoopKey(): string {
  return randomBytes(32).toString("hex");
}

export function encryptFile(fileData: Express.Multer.File) {
  return encryptWithKey(fileData.buffer, ENCRYPTION_KEY);
}

export function decryptFile(
  encryptedData: Buffer,
  ivHex: string,
  tagHex: string,
) {
  return decryptWithKey(encryptedData, ENCRYPTION_KEY, ivHex, tagHex);
}
