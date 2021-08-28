import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

const imageSize = 50;
const styles = StyleSheet.create({
  authorDetailContainer: { flexDirection: "row", alignItems: "center" },
  authorDetails: {
    marginLeft: 10,
    flexDirection: "column",
  },
  authorName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  articleReleaseDate: {
    color: Colors.grey,
    fontSize: 18,
  },
  profileImage: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    resizeMode: "cover",
  },
});

export default styles;
