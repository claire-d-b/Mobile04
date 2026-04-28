import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  localLogin: string | null;
  setLocalLogin: (login: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  localLogin: null,
  setLocalLogin: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [localLogin, setLocalLoginState] = useState<string | null>(null);

  // Charge au démarrage
  useEffect(() => {
    AsyncStorage.getItem("localLogin").then((val) => {
      if (val) {
        console.log("✅ localLogin chargé depuis AsyncStorage:", val);
        setLocalLoginState(val);
      }
    });
  }, []);

  const setLocalLogin = async (login: string | null) => {
    setLocalLoginState(login);
    if (login) {
      await AsyncStorage.setItem("localLogin", login);
      console.log("✅ localLogin sauvegardé:", login);
    } else {
      await AsyncStorage.removeItem("localLogin");
    }
  };

  return (
    <AuthContext.Provider value={{ localLogin, setLocalLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);