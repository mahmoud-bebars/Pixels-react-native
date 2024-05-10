import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { data } from "../constants/data";
import { hp, wp } from "../heplers/common";
import { theme } from "../constants/theme";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <View style={styles.categories}>
      <FlatList
        horizontal
        contentContainerStyle={styles.flatListContainer}
        showsHorizontalScrollIndicator={false}
        data={data.categories}
        key={(item) => item}
        renderItem={({ item, index }) => (
          <CategoryItem
            isActive={activeCategory == item}
            handleChangeCategory={handleChangeCategory}
            title={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default Categories;

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  const backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  return (
    <Animated.View
      entering={FadeInRight.duration(index * 200)
        .duration(1000)
        .damping(14)}
    >
      <Pressable
        onPress={() => handleChangeCategory(title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,

    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    textTransform: "capitalize",
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.meduim,
  },
  categories: {},
});
