import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

const styles = StyleSheet.create({
  container: ({ selected }) => ({
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    padding:8,
    flexDirection: "row",
    backgroundColor: selected ? Colors.primary : "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
  }),
  title: ({ selected }) => ({
    color: selected ? "white" : "black",
    fontSize: 22,
    marginLeft: 5,
  }),
});
export default styles;
