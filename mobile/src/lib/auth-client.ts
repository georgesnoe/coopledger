import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const authClient = {
  async signUp(data: { name: string; email: string; phoneNumber: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Signup failed");

    if (result.token) {
      await SecureStore.setItemAsync("auth_token", result.token);
    }
    return result;
  },

  async signIn(data: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Login failed");

    if (result.token) {
      await SecureStore.setItemAsync("auth_token", result.token);
    }
    return result;
  },

  async getToken() {
    return await SecureStore.getItemAsync("auth_token");
  },

  async getSession() {
    const token = await SecureStore.getItemAsync("auth_token");
    if (!token) return { data: null };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Session expired");
      const user = await response.json();
      return { data: user };
    } catch (e) {
      await SecureStore.deleteItemAsync("auth_token");
      return { data: null };
    }
  },

  async signOut() {
    await SecureStore.deleteItemAsync("auth_token");
  },
};
