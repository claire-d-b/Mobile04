import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import CTextInput from "./CTextInput";
import CIconButton from "./CIconButton";
import CRating from './CRating'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


type RootStackParamList = {
  home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "home"
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [text, setText] = useState("")
  return (
      <View style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "100%", alignSelf: "flex-start" }}>
          <CTextInput
            secureTextEntry={false}
            right={<></>}
            onBlur={() => {}}
            onChangeText={(str) => {setText(str)}}
            label="Title"
            msg={text}
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
            numberOfLines={0}
            />
          </View>
          <View style={{ display: "flex", width: "100%" }}>
            <CRating color="#534DB3" />
          </View>
        <View style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CTextInput
            secureTextEntry={false}
            right={<></>}
            onBlur={() => {}}
            onChangeText={(str) => {setText(str)}}
            label="Content"
            msg={text}
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
            numberOfLines={3}
            />
          </View>
          <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
            <CIconButton icon="plus" iconColor="white" containerColor="#534DB3" size={20} onPress={() => {}} /> 
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
