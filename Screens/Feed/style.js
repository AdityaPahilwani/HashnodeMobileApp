import { StyleSheet, Platform } from "react-native";
import Colors from "../../Constants/Colors";
import { chipContainerHeight } from "../../Components/ChipContainer/style";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageLoader: {
    paddingTop: chipContainerHeight,
  },
  flatListContainer: {
    flexGrow: 1,
    backgroundColor: Colors.accent,
    paddingTop: chipContainerHeight,
  },
});

export default styles;
