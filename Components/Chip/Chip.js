import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import style from "./style";

const Chip = ({ selected, Icon, displayName, onPress }) => {
  return (
    <Pressable style={style.container({ selected })} onPress={onPress}>
      <Icon color={selected ? "white" : "black"} />
      <Text style={style.title({ selected })}>{displayName}</Text>
    </Pressable>
  );
};

export default Chip;
