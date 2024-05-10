import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";

import { theme } from "../constants/theme";
import { wp, hp, getColumnCount } from "../heplers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
const WelcomeScreen = () => {
  const router = useRouter();
  const screen = getColumnCount();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={
          screen === 4 // means web View
            ? require("../assets/images/welcome_web.webp")
            : require("../assets/images/welcome_mob.webp")
        }
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {/* Lainer Gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.5)", "white"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* Content */}

        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.duration(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.duration(500).springify()}
            style={styles.punchLine}
          >
            Every Pixel Tells a Story
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(600).springify()}>
            <Pressable
              onPress={() => router.push("home")}
              style={styles.startButton}
            >
              <Text style={styles.startText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold,
  },
  punchLine: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.meduim,
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fontWeights.meduim,
    letterSpacing: 1,
  },
});

export default WelcomeScreen;
