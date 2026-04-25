import * as Location from "expo-location";
import React, { useState, useEffect, use } from "react";
import { View, ActivityIndicator, BlurEvent, Platform } from "react-native";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { router } from "expo-router";

interface information {
  login: string;
  password: string;
}

type RootStackParamList = {
  signin: undefined;
  register: undefined;
  home: undefined;
};

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "signin"
>;

const SignIn = () => {
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  // const { promptAsync: googlePrompt } = useGoogleAuth(() => {
  //   console.log("🏠 Callback Google → router.push /home");
  //   router.push("/home");
  // });
  const { promptAsync: googlePrompt } = useGoogleAuth();
  // const { promptAsync: githubPrompt } = useGithubAuth(() => {
  //   console.log("🏠 Callback GitHub → router.push /home");
  //   router.push("/home");
  // });
  const { promptAsync: githubPrompt } = useGithubAuth();

  const handleSubmit = async ({ login, password }: information) => {
    try {
      if (Platform.OS === "android") {
        const res = await fetch("http://10.0.2.2:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        });
        const data = await res.json();
        if (!res.ok) console.error("Unknown user");
        else {
          console.log("Log-in successful:", data);
          router.push("/home"); // ← même comportement sur Android et iOS
        }
      } else {
        const res = await fetch("http://127.0.0.1:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        });
        const data = await res.json();
        if (!res.ok) console.error("Unknown user");
        else {
          console.log("Log-in successful:", data);
          router.push("/home");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <CTextInput
          secureTextEntry={false}
          right={<></>}
          onBlur={() => {}}
          onChangeText={(text: string) => {
            setLogin(text);
          }}
          label="login"
          msg={login}
          placeholder="Type your login"
          variant="outlined"
          textColor="#534DB3"
          outlineColor="#534DB3"
          outlineStyle={{ borderRadius: 10 }}
          activeOutlineColor="#534DB3"
          underlineColor="#534DB3"
          activeUnderlineColor="#534DB3"
          selectionColor="#534DB3"
          contentStyle={{}}
          style={{ width: "100%" }}
        />
        <CTextInput
          secureTextEntry={secure}
          right={
            <TextInput.Icon
              icon={secure ? "eye-off" : "eye"}
              onPress={() => setSecure(!secure)}
            />
          }
          onBlur={() => {}}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          label="password"
          msg={password}
          placeholder="Type your password"
          variant="outlined"
          textColor="#534DB3"
          outlineColor="#534DB3"
          outlineStyle={{ borderRadius: 10 }}
          activeOutlineColor="#534DB3"
          underlineColor="#534DB3"
          activeUnderlineColor="#534DB3"
          selectionColor="#534DB3"
          contentStyle={{}}
          style={{ width: "100%" }}
        />
        <CButton
          onClick={() => handleSubmit({ login, password })}
          msg="Send"
          variant="contained"
          textColor="white"
          style={{ display: "flex", alignSelf: "flex-end", marginTop: 20 }}
          buttonColor="#534DB3"
          labelStyle={{}}
        />
        <CButton
          onClick={() => router.push("/register")}
          msg="Not registered yet ? Create an account"
          variant="text"
          textColor="#534DB3"
          style={{ display: "flex", alignSelf: "flex-end" }}
          buttonColor="transparent"
          labelStyle={{}}
        />
        <CButton
          onClick={() => googlePrompt()}
          msg="Connect with Google"
          variant="text"
          textColor="gray"
          style={{ display: "flex", alignSelf: "flex-end" }}
          buttonColor="transparent"
          labelStyle={{}}
        />
        <CButton
          onClick={() => githubPrompt()}
          msg="Connect with Github"
          variant="text"
          textColor="gray"
          style={{ display: "flex", alignSelf: "flex-end" }}
          buttonColor="transparent"
          labelStyle={{}}
        />
      </View>
    </View>
  );
};

export default SignIn;
