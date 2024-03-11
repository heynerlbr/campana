import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./src/navigations/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView> */}
      <Navigation />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}
