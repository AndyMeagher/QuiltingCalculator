import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";

export default function MainLayout() {
  const backgroundColor = useThemeColor({}, "background");

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
    </Stack>
  );
}
