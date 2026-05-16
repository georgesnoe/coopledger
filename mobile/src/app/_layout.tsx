import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  authClient,
  getAuthToken,
  authenticatedFetch,
} from "@/utils/auth-client";
import { env } from "@/config/env";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);
  const [loaded, error] = useFonts({
    "GoogleSansText-Regular": require("@/assets/fonts/GoogleSansText-Regular.ttf"),
    "GoogleSansText-Medium": require("@/assets/fonts/GoogleSansText-Medium.ttf"),
    "GoogleSansText-Bold": require("@/assets/fonts/GoogleSansText-Bold.ttf"),
    "GoogleSansText-Italic": require("@/assets/fonts/GoogleSansText-Italic.ttf"),
    "GoogleSansText-BoldItalic": require("@/assets/fonts/GoogleSansText-BoldItalic.ttf"),
    "GoogleSansText-MediumItalic": require("@/assets/fonts/GoogleSansText-MediumItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (!loaded || error) return;

    const checkAuth = async () => {
      const session = await authClient.getSession();
      const user = session.data;

      const publicPages = ["login", "signup", "verify-whatsapp"];
      const inPublic = publicPages.includes(segments[0]);
      const inCoopSelection = segments[0] === "choose-cooperative";

      if (inPublic) {
        setIsReady(true);
        return;
      }

      if (!user) {
        router.replace("/login");
        setIsReady(true);
        return;
      }

      try {
        const { data } = await authenticatedFetch(
          `${env.API_BASE_URL}/api/user/dashboard`,
          {},
          router,
        );

        const hasCooperative =
          data.cooperatives && data.cooperatives.length > 0;

        if (!hasCooperative) {
          const inCoopSelection = segments[0] === "choose-cooperative";
          if (!inCoopSelection) {
            router.replace("/choose-cooperative");
          }
        }
      } catch (e) {
        console.error("Auth check failed", e);
      }
      setIsReady(true);
    };

    checkAuth();
  }, [loaded, error, segments]);

  if (!loaded && !error) {
    return null;
  }

  if (!isReady) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
