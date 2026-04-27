import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import CTextInput from "./CTextInput";
import CIconButton from "./CIconButton";
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
      <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <CTextInput
        secureTextEntry={false}
        right={<></>}
        onBlur={() => {}}
        onChangeText={(str) => {setText(str)}}
        label="Please add entries"
        msg={text}
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
        style={{ margin: 10 }}
        disabled={false}
        />
        <CIconButton icon="plus" iconColor="white" containerColor="#534DB3" size={20} onPress={() => {}} /> 
    </View>
    <Text style={{ color: "black" }}>This is the homepage</Text>
  </View>
  );
};

export default Home;
