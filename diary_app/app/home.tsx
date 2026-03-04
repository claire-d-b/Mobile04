import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

type RootStackParamList = {
  home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "home"
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={{ display: "flex", width: "100%", height: "100%" }}>
      <Text style={{ color: "black" }}>This is the homepage</Text>
    </View>
  );
};

export default Home;
