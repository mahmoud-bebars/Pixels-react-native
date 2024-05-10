import { Pressable, StyleSheet, Text, View } from "react-native";

import { captalize, hp } from "../heplers/common";
import { theme } from "../constants/theme";

const FilterViews = ({ title, content }) => {
  return (
    <View style={styles.sectionContent}>
      <Text style={styles.sectiontitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFiltersRow = ({ data, filters, setFilters, filterName }) => {
  const onSelect = (item) => {
    setFilters((prev) => ({ ...prev, [filterName]: item }));
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
          let color = isActive ? "white" : theme.colors.neutral(0.7);
          return (
            <Pressable
              onPress={() => onSelect(item)}
              key={item}
              style={[styles.outlinedButton, { backgroundColor }]}
            >
              <Text style={[styles.outlinedButtonText, { color }]}>
                {captalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFiltersRow = ({ data, filters, setFilters, filterName }) => {
  const onSelect = (item) => {
    setFilters((prev) => ({ ...prev, [filterName]: item }));
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          let isActive = filters && filters[filterName] == item;
          let borderColor = isActive ? theme.colors.neutral(0.4) : "white";
          return (
            <Pressable onPress={() => onSelect(item)} key={item}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

export default FilterViews;

const styles = StyleSheet.create({
  sectionContent: { gap: 8 },
  sectiontitle: { fontSize: hp(2.4), fontWeight: theme.fontWeights.meduim },
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlinedButtonText: {},
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: "continuous",
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
});
