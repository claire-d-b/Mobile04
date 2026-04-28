import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { View, Platform } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext"
import CTextInput from "./CTextInput";
import CIconButton from "./CIconButton";
import CRating from './CRating'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const backendUrl = Platform.OS === "android"
  ? "http://10.0.2.2:3000"
  : "http://localhost:3000";


const Home = () => {
  const { localLogin } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [feeling, setFeeling] = useState(0);

  const auth = getAuth();
  const email = auth.currentUser?.email ?? localLogin;
  console.log(auth.currentUser)

  const handleSubmit = async () => {
    if (!title || !content) return;
    console.log("📡 auth.currentUser:", auth.currentUser?.email);
    console.log("📡 localLogin:", localLogin);
    console.log("📡 email utilisé:", email);


    try {
      const res = await fetch(`${backendUrl}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
          title,
          feeling,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Failed to create entry:", data.error);
        return;
      }

      console.log("✅ Entry created:", data);

      // Reset
      setTitle("");
      setContent("");
      setFeeling(0);

    } catch (err) {
      console.error("❌ Error creating entry:", err);
    }
  };

  return (
      <View style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "100%", alignSelf: "flex-start" }}>
          <CTextInput
            secureTextEntry={false}
            right={<></>}
            onBlur={() => {}}
            onChangeText={(str) => {setTitle(str)}}
            label="Title"
            msg={title}
            placeholder="Please add a title"
            variant="outlined"
            textColor="#534DB3"
            outlineColor="#534DB3"
            outlineStyle={{ borderRadius: 10 }}
            activeOutlineColor="#534DB3"
            underlineColor="#534DB3"
            activeUnderlineColor="#534DB3"
            selectionColor="#534DB3"
            contentStyle={{}}
            style={{ marginHorizontal: 20 }}
            disabled={false}
            multiline={false}
            />
          </View>
          <View style={{ display: "flex", width: "100%" }}>
            <CRating setRating={setFeeling} color="#534DB3" />
          </View>
        <View style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CTextInput
            secureTextEntry={false}
            right={<></>}
            onBlur={() => {}}
            onChangeText={(str) => {setContent(str)}}
            label="Content"
            msg={content}
            placeholder="Please add entries"
            variant="outlined"
            textColor="#534DB3"
            outlineColor="#534DB3"
            outlineStyle={{ borderRadius: 10 }}
            activeOutlineColor="#534DB3"
            underlineColor="#534DB3"
            activeUnderlineColor="#534DB3"
            selectionColor="#534DB3"
            contentStyle={{}}
            style={{ marginHorizontal: 20, height: 100}}
            disabled={false}
            multiline={true}
            />
          </View>
          <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
            <CIconButton icon="plus" iconColor="white" containerColor="#534DB3" size={20} onPress={handleSubmit} /> 
          </View>
        </View>
      <Text style={{ color: "black" }}>This is the homepage</Text>
    </View>
  );
};

export default Home;

// id SERIAL PRIMARY KEY,
// user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
// date DATE NOT NULL DEFAULT CURRENT_DATE,
// title VARCHAR(255),
// feeling INTEGER CHECK (feeling BETWEEN 1 AND 5),
// content TEXT,
// created_at TIMESTAMP DEFAULT NOW(),
// updated_at TIMESTAMP DEFAULT NOW()
