import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, Image, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useZoomGesture } from "react-native-zoom-reanimated";

const IMAGES = {
  Horizontal: require("../../assets/images/horizontalSeam.png"),
  Vertical: require("../../assets/images/horizontalSeam.png"),
  Diagonal: require("../../assets/images/horizontalSeam.png"),
};

const IMAGE_ASPECT = 5118 / 7194;

export default function SeamDiagramScreen() {
  const { direction } = useLocalSearchParams<{
    direction: "Horizontal" | "Vertical" | "Diagonal";
  }>();
  const router = useRouter();

  const {
    zoomGesture,
    onLayout,
    onLayoutContent,
    contentContainerAnimatedStyle,
  } = useZoomGesture();

  const imageWidth = Dimensions.get("window").width - 32;
  const imageHeight = imageWidth * IMAGE_ASPECT;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={zoomGesture}>
        <View
          style={{ width: imageWidth, height: imageHeight }}
          onLayout={onLayout}
          collapsable={false}
        >
          <Animated.View
            style={contentContainerAnimatedStyle as any}
            onLayout={onLayoutContent}
          >
            <Image
              source={IMAGES[direction]}
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 12,
              }}
            />
          </Animated.View>
        </View>
      </GestureDetector>
      <Text
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: Fonts.montreal.medium,
          fontSize: 12,
          marginTop: 12,
        }}
      >
        Pinch to zoom
      </Text>
      <Ionicons
        name="close"
        size={24}
        color="white"
        style={{ position: "absolute", top: 16, right: 16, paddingTop: 32 }}
        onPress={() => router.back()}
      />
    </View>
  );
}
