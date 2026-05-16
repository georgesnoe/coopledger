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
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
      },
    },
  },
});

export const getAuthToken = async () => {
  const session = await authClient.getSession();
  return session.data?.session.token;
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}, router: any) => {
  const token = await getAuthToken();
  
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    await authClient.signOut();
    router.replace("/login");
    throw new Error("Session expired. Please login again.");
  }

  const text = await response.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(`Server returned non-JSON response (status ${response.status}): ${text.slice(0, 200)}`);
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return { data, response };
};

export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};
