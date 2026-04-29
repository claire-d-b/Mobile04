import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import { View, Platform } from "react-native";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext"
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import CTextInput from "./CTextInput";
import CIconButton from "./CIconButton";
import CRating from './CRating'
import CChip from "./CChip";
import CModal from "./CModal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const emotions = [
  'emoticon',
  'emoticon-happy',
  'emoticon-neutral',
  'emoticon-sad',
  'emoticon-angry',
];

const backendUrl = Platform.OS === "android"
  ? "http://10.0.2.2:3000"
  : "http://localhost:3000";

interface Entry {
  id: number;
  date: string;
  title: string;
  feeling: number;
  content: string;
  created_at: string;
}

interface Props {
  setEntries: []
}

const Home = () => {
  const { localLogin } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [feeling, setFeeling] = useState(1);

  const auth = getAuth();
  const email = auth.currentUser?.email ?? localLogin;
  console.log(auth.currentUser)
  const [entries, setEntries] = useState<Entry[]>([]);

  const getEmail = () => {
    const firebaseEmail = getAuth().currentUser?.email;
    return firebaseEmail ?? null;
  };

  const fetchEntries = async () => {
      const email = getEmail();
      console.log("📡 fetchEntries email:", email);
      if (!email) return;

      try {
        const res = await fetch(`${backendUrl}/entries/${encodeURIComponent(email)}`);
        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Failed to fetch entries:", data.error);
          return;
        }

        console.log("✅ Entries fetched:", data.length);
        setEntries(data);
      } catch (err) {
        console.error("❌ Error fetching entries:", err);
      }
    };

  const handleSubmit = async () => {
    if (!title || !content) return;
    console.log("📡 auth.currentUser:", auth.currentUser?.email);
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
      setFeeling(1);
      await fetchEntries();

    } catch (err) {
      console.error("❌ Error creating entry:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [email]);

  return (
    <PaperProvider>
      <View style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <CModal style={{ width: "100%", height: "100%" }}>
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
              <CRating setRating={setFeeling} color="#BBB0D1" focusColor="#534DB3" />
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
          </CModal>
          <Text style={{ color: "black" }}>This is the homepage</Text>
          { entries && entries.length > 0 && entries.map((e, i) => {
            return <View key={`entry_${i}`} style={{ display: "flex", flexDirection: "row", marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
              <CChip onPress={() => {}} label="" mode="outlined" textStyle={{}} style={{}} buttonColor="#534DB3" icon="" disabled={false}>{e.title}</CChip>
              <CIconButton icon={emotions[(e.feeling ?? 1) - 1]} iconColor="#534DB3" containerColor="" size={20} onPress={() => {}} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ flex: 1 }}>{e.content}</Text>
            </View>
          })}
        </View>
        </PaperProvider>
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
