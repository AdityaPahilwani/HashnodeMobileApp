import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./Navigation/stackNavigation";
export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
