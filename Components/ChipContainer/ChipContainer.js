import React from "react";
import { View, ScrollView, Animated } from "react-native";
import styles from "./style";
import Chip from "../Chip/Chip";
import { FeedTypes } from "../../Constants/NavBarData";
import { chipContainerHeight } from "./style";

const ChipContainer = ({ selectedApiType, changeApiType, scrollY }) => {
  const diffClamp = Animated.diffClamp(scrollY, 0, chipContainerHeight);
  const translateY = diffClamp.interpolate({
    inputRange: [0, chipContainerHeight],
    outputRange: [0, -chipContainerHeight],
  });
  return (
    <Animated.View
      style={[
        styles.scrollViewWrapper,
        { transform: [{ translateY: translateY }] },
      ]}
    >
      <ScrollView
        style={[styles.scrollView]}
        contentContainerStyle={styles.scrollViewContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {FeedTypes.map((data) => {
          return (
            <View style={{ marginHorizontal: 5 }} key={data.API}>
              <Chip
                {...data}
                onPress={changeApiType.bind(this, data.API)}
                selected={data.API === selectedApiType}
              />
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default ChipContainer;
