import { StyleSheet, Platform } from "react-native";
import Colors from "../../Constants/Colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accent,
    padding: 10,
    height: "auto",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.grey,
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
    overflow: "hidden",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  brief: {
    color: Colors.grey,
    fontSize: 20,
  },
  articleDataContainer: {
    marginVertical: 10,
  },
});

export default styles;
