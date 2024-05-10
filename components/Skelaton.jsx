import { StyleSheet, Text, View } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumnCount, wp, getImageSize } from "../heplers/common";
import { theme } from "../constants/theme";

const Skelaton = () => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={[
          { imageWidth: 4000, imageHeight: 2250 },
          { imageWidth: 3000, imageHeight: 5250 },
          { imageWidth: 5000, imageHeight: 7250 },
          { imageWidth: 1000, imageHeight: 4250 },
          { imageWidth: 4000, imageHeight: 2250 },
          { imageWidth: 3000, imageHeight: 5250 },
          { imageWidth: 5000, imageHeight: 7250 },
          { imageWidth: 1000, imageHeight: 4250 },
        ]}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyles}
        initialNumToRender={1000}
        renderItem={({ item, index }) => (
          <ImageCard index={index} item={item} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default Skelaton;

const ImageCard = ({ item, index, columns }) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  const getDynamicHeight = () => {
    let { imageWidth: width, imageHeight: height } = item;

    return { height: getImageSize(height, width) };
  };
  return (
    <View style={styles.warpper}>
      <View style={[styles.image, getDynamicHeight()]} transition={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { minHeight: 3, width: wp(100) },
  listContainerStyles: { paddingHorizontal: wp(4) },
  warpper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",

    marginHorizontal: wp(1),
    marginBottom: wp(1.5),
  },
  image: {
    height: 300,
    width: "100%",
  },
});
