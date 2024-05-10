import { StyleSheet, Text, View } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumnCount, wp } from "../heplers/common";
const ImageGrid = ({ router, images }) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyles}
        initialNumToRender={1000}
        renderItem={({ item, index }) => (
          <ImageCard
            router={router}
            index={index}
            item={item}
            columns={columns}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: { minHeight: 3, width: wp(100) },
  listContainerStyles: { paddingHorizontal: wp(4) },
});
