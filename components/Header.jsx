import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { hp, wp } from "../heplers/common";

const Header = ({ handleScrollUp, bottomSheetModalRef }) => {
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.header}>
      <Pressable onPress={handleScrollUp}>
        <Text style={styles.title}>Pixels</Text>
      </Pressable>
      <Pressable onPress={handlePresentModalPress}>
        <FontAwesome6
          name="bars-staggered"
          size={22}
          color={theme.colors.neutral(0.7)}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
});
