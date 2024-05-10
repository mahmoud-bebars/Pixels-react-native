import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { hp, wp } from "../heplers/common";

const SearchBar = ({ search, handleTextDebounce, clearSearch, searchRef }) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
      </View>
      <TextInput
        ref={searchRef}
        placeholder="Search For Photos..."
        style={styles.searchInput}
        // value={search}
        onChangeText={handleTextDebounce}
      />
      {search !== "" ? (
        <Pressable onPress={() => clearSearch()} style={styles.closeIcon}>
          <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.sm,
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});
