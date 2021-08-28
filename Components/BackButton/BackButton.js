import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const IconSize = 24;
const IconContainer = IconSize * 2;

const BackButton = (props) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const { handleBackButton = goBack } = props;
  return (
    <Pressable style={styles.buttonStyle} onPress={handleBackButton}>
      <Ionicons name="arrow-back-outline" size={IconSize} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: IconContainer,
    width: IconContainer,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
export default BackButton;
