import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

export const chipContainerHeight = 80;
const styles = StyleSheet.create({
  scrollView: {
    height: 80,
    backgroundColor: Colors.accent,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      web: {
        boxShadow: "0 3px 5px rgba(0,0,0,0.10), 1px 2px 5px rgba(0,0,0,0.10)",
      },
    }),
  },
  scrollViewContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 80,
  },
  scrollViewWrapper: {
    height: 80,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
