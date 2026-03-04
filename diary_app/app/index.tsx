// app/index.tsx
import "../global.css";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/signin" />; // ← must be lowercase
}
