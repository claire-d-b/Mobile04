import * as Location from "expo-location";
import React, { useState, useEffect, use } from "react";
import { View, ActivityIndicator, BlurEvent } from "react-native";
import {
  Appbar,
  Text,
  IconButton,
  Icon,
  Menu,
  TextInput,
} from "react-native-paper";
import { evaluate } from "mathjs";
import useGoogleAuth from "./auth_google";
import useGithubAuth from "./auth_github";
import CTextInput from "./CTextInput";
import CButton from "./CButton";
import * as Crypto from "expo-crypto";
import { useNavigation } from "@react-navigation/native";
import SignIn from "./Signin";

interface information {
  login: string;
  password: string;
}

export default function CAppbar() {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [secure, setSecure] = useState(true);

  const handleSubmit = async ({ login, password }: information) => {
    try {
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password,
      );
      const res = await fetch("http://10.0.2.2:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password: hashedPassword }),
      });
      const data = await res.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return <SignIn />;
}
