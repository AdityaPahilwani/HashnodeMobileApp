import React from "react";
import { Pressable, View, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";

const IconSize = 24;
const IconContainer = IconSize * 2;
const absolutePos = 20;
const ScrollToTopButton = ({ onPress }) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <AntDesign name="up" size={IconSize} color="white" />
    </Pressable>
  );
};

const buttonStyle = {
  position: "absolute",
  backgroundColor: Colors.primary,
  bottom: absolutePos,
  right: absolutePos,
  height: IconContainer,
  width: IconContainer,
  borderRadius: IconContainer / 2,
  justifyContent: "center",
  alignItems: "center",
};
export default ScrollToTopButton;
