import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { hp, wp } from "../heplers/common";

const Error = () => {
  return (
    <View style={styles.contentContainer}>
      <Ionicons
        name="alert-circle-outline"
        size={50}
        color={theme.colors.neutral(0.6)}
      />
      <Text style={styles.title}>Error</Text>
      <Text style={styles.punchLine}>Something went Wrong...</Text>
    </View>
  );
};

export default Error;

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
