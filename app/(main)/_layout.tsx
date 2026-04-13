import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="back-calculator"
        options={{
          headerShown: true,
          header: () => (
            <View style={{alignItems: "flex-start", paddingTop: insets.top, paddingHorizontal: 16, paddingBottom: 8 }}>
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, paddingBottom: 16 }}>
                <Ionicons name="arrow-back" size={24} />
              </TouchableOpacity>
              <View style={{ flexDirection: "row"}}>
              <Image source={require("../../assets/images/Union.png")} />
              <Text
                style={{
                  fontFamily: Fonts.editorial.italic,
                  fontSize: 24,
                  paddingLeft: 8,
                }}
              >
                Backing Calculator
              </Text>
            </View>
            </View>
          ),
          contentStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      />
    </Stack>
  );
}
