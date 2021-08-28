import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingContainer = ({
  parentContainerStyle,
  indicatorSize = "large",
  indicatorColor = "blue",
}) => {
  return (
    <View style={[style, parentContainerStyle]}>
      <ActivityIndicator size={indicatorSize} color={indicatorColor} />
    </View>
  );
};

const style = {
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};
export default LoadingContainer;
