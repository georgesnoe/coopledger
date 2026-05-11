import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { env } from "@/config/env";

export const authClient = createAuthClient({
  baseURL: env.API_BASE_URL,
  plugins: [
    expoClient({
      scheme: "coopledger",
      storagePrefix: "coopledger",
      storage: SecureStore,
    }),
  ],
});
