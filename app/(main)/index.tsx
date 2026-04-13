import { ContentCard } from "@/components/content-card";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <Image source={require("../../assets/images/ohio.png")} />
        <Text
          style={{
            fontFamily: Fonts.editorial.italic,
            fontSize: 24,
            paddingLeft: 8,
          }}
        >
          Hi Quilter,
        </Text>
      </View>

      <Text
        style={{
          fontFamily: Fonts.montreal.medium,
          fontSize: 14,
          marginBottom: 32,
        }}
      >
        Your quilting toolkit
      </Text>

      <TouchableOpacity onPress={() => router.push("/back-calculator")}>
        <ContentCard color={Colors.branding.yellow}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: Fonts.montreal.medium,
                  fontSize: 18,
                  paddingBottom: 8,
                }}
              >
                Backing Calculator
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.montreal.book,
                  fontSize: 14,
                  paddingBottom: 8,
                }}
              >
                Calculator how much backing fabric you need
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={24} />
          </View>
        </ContentCard>
      </TouchableOpacity>
    </View>
  );
}
