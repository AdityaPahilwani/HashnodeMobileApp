import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import feed from "../Screens/Feed/feed";
import feedDetail from "../Screens/FeedDetail/feedDetail";
import { Image } from "react-native";

const brandLogo = "../Assets/Images/brand-icon.png";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerBackTitleStyle: {
          fontSize: 26,
          color: "black",
        },
        animation: "slide_from_right",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "white" },
        title: "Hashnode",
        statusBarStyle: "dark",
        headerRight: () => (
          <Image
            source={require(brandLogo)}
            style={{ height: 40, width: 40, resizeMode: "contain" }}
          />
        ),
      }}
    >
      <Stack.Screen name="feed" component={feed} />
      <Stack.Screen name="feedDetail" component={feedDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
