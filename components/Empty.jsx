import { StyleSheet, Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { hp } from "../heplers/common";

const Empty = () => {
  return (
    <View style={styles.contentContainer}>
      <FontAwesome6
        name="hourglass-empty"
        size={50}
        color={theme.colors.neutral(0.6)}
      />
      <Text style={styles.title}>No Images</Text>
      <Text style={styles.punchLine}>Can't Found Images...</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.neutral(0.3),
    fontWeight: theme.fontWeights.bold,
  },
  punchLine: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.thin,
  },
});
