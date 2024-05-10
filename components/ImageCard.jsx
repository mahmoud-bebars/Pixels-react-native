import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { getImageSize, wp } from "../heplers/common";
import { theme } from "../constants/theme";

const ImageCard = ({ router, item, index, columns }) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  const getDynamicHeight = () => {
    let { imageWidth: width, imageHeight: height } = item;

    return { height: getImageSize(height, width) };
  };

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...item } })
      }
      style={styles.warpper}
    >
      <Image
        style={[styles.image, getDynamicHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
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
