import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef } from "react";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { Platform } from "react-native";
import auth from "../config/firebase";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
};

const useGithubAuth = () => {
  const redirectUri = AuthSession.makeRedirectUri();
  const isHandled = useRef(false); // ✅ empêche le double appel

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "Ov23liMl9KamCid3JjRa",
      scopes: ["read:user", "user:email"],
      redirectUri,
      usePKCE: false, // ✅ désactive PKCE — GitHub OAuth App ne le supporte pas
    },
    discovery,
  );

  useEffect(() => {
    const signIn = async () => {
      if (response?.type !== "success") return;
      if (isHandled.current) return;
      isHandled.current = true;

      const { code } = response.params;
      const codeVerifier = request?.codeVerifier; // ✅ récupère le code_verifier
      console.log("📡 code:", code);
      console.log("📡 codeVerifier:", codeVerifier);

      const backendUrl =
        Platform.OS === "android"
          ? "http://10.0.2.2:3000/auth/github"
          : "http://localhost:3000/auth/github";

      try {
        const res = await fetch(backendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, codeVerifier }), // ✅ envoie les deux
        });

        const text = await res.text();
        console.log("📡 Backend raw response:", text);
        const data = JSON.parse(text);

        if (data.error) {
          console.error("❌ GitHub token error:", data.error);
          return;
        }

        const credential = GithubAuthProvider.credential(data.access_token);
        await signInWithCredential(auth, credential);
        console.log("✅ GitHub login success");
      } catch (error) {
        console.error("❌ GitHub auth error:", error);
      }
    };

    signIn();
  }, [response]);

  return { promptAsync, request };
};

export default useGithubAuth;
