import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { hp, wp } from "../heplers/common";
import { Ionicons } from "@expo/vector-icons";

const FiltersPreview = ({ filters, clearFilterByKey }) => {
  return (
    <>
      {filters && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {Object.keys(filters).map((key, index) => {
              return (
                <View key={key} style={styles.filterItem}>
                  {key === "colors" ? (
                    <View
                      style={{
                        height: 20,
                        width: 30,
                        borderRadius: 7,
                        backgroundColor: filters[key],
                      }}
                    />
                  ) : (
                    <Text style={styles.filterItemText}>{filters[key]}</Text>
                  )}

                  <Pressable
                    style={styles.filterCloseIcon}
                    onPress={() => clearFilterByKey(key)}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={theme.colors.neutral(0.6)}
                    />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: theme.radius.xs,
    gap: 10,
    alignItems: "center",
  },
  filterItemText: { fontSize: hp(1.9) },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 1,
    borderRadius: 7,
  },
});

export default FiltersPreview;
