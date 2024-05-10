import { StyleSheet, View, Text, Pressable } from "react-native";
import { useMemo } from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { captalize, hp } from "../heplers/common";
import { theme } from "../constants/theme";
import FilterViews, { ColorFiltersRow, CommonFiltersRow } from "./FilterViews";
import { data } from "../constants/data";
const FiltersModal = ({
  bottomSheetModalRef,
  onClose,
  applyFilters,
  resetFilters,
  filters,
  setFilters,
}) => {
  // variables
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
      // onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let title = captalize(sectionName);
            let sectionData = data.filters[sectionName];
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <FilterViews
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}
          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttons}
          >
            <Pressable onPress={resetFilters} style={styles.resetButton}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>

            <Pressable onPress={applyFilters} style={styles.applyButton}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props) => <CommonFiltersRow {...props} />,
  orientation: (props) => <CommonFiltersRow {...props} />,
  type: (props) => <CommonFiltersRow {...props} />,
  colors: (props) => <ColorFiltersRow {...props} />,
};

export default FiltersModal;

const CustomBackdrop = ({ animatedIndex, style }) => {
  const conatinerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    conatinerAnimatedStyle,
  ];
  return (
    <Animated.View style={containerStyle}>
      {/* Blur View */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    gap: 15,
    // width: "100%",

    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  buttonText: {
    fontSize: hp(2.2),
  },
});
