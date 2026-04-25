import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import auth from "../config/firebase";

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "82158931099-3o3m2s3l5m36kp193khrtuekaba5sv2c.apps.googleusercontent.com",
    androidClientId:
      "469329963968-26ouu57mcmg3j7dtlml4m2rdbd9o957j.apps.googleusercontent.com",
    iosClientId:
      "82158931099-uplv3fi1jrfj5831gr0m15ngvgi196s6.apps.googleusercontent.com",
    scopes: ["openid", "email", "profile"],
    // ✅ retire androidClientId, iosClientId et redirectUri
  });

  useEffect(() => {
    const signIn = async () => {
      console.log("📡 response type:", response?.type);
      if (response?.type !== "success") return;

      const { id_token } = response.params;
      if (!id_token) {
        console.error("❌ No id_token received");
        return;
      }

      try {
        const credential = GoogleAuthProvider.credential(id_token);
        const result = await signInWithCredential(auth, credential);
        setUser(result.user);
        console.log("✅ Google login success:", result.user.email);
      } catch (error) {
        console.error("❌ Firebase Google error:", error);
      }
    };

    signIn();
  }, [response]);

  return { promptAsync, user, request };
};

export default useGoogleAuth;
