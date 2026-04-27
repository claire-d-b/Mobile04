import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Platform } from "react-native";
import auth from "../config/firebase";

WebBrowser.maybeCompleteAuthSession();

const backendUrl = Platform.OS === "android"
  ? "http://10.0.2.2:3000"
  : "http://localhost:3000";

const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    const signIn = async () => {
      if (response?.type !== "success") return;

      const { authentication } = response;
      const token = authentication?.accessToken;

      if (!token) return;

      try {
        // 1. Appel backend → upsert en base PostgreSQL
        const res = await fetch(`${backendUrl}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Backend Google error:", data.error);
          return;
        }

        console.log("✅ Google user in DB:", data.user);

        // 2. Firebase Auth
        const credential = GoogleAuthProvider.credential(
          authentication?.idToken ?? null,
          token
        );
        await signInWithCredential(auth, credential);
        console.log("✅ Google login success:", data.user.login);

      } catch (err) {
        console.error("❌ Google auth error:", err);
      }
    };

    signIn();
  }, [response]);

  return { promptAsync, request };
};

export default useGoogleAuth;