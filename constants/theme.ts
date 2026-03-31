/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { FontSource } from "expo-font";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FDFDF6",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  branding: {
    blue: "#7DA4FF",
    yellow: "#FFFF7D",
    green: "#1BB552",
    purple: "#C87DFF",
  },
};

export const Fonts = {
  editorial: {
    regular: "PPEditorialOld-Regular",
    italic: "PPEditorialOld-Italic",
    ultralight: "PPEditorialOld-Ultralight",
    ultralightItalic: "PPEditorialOld-UltralightItalic",
    ultrabold: "PPEditorialOld-Ultrabold",
    ultraboldItalic: "PPEditorialOld-UltraboldItalic",
  },
  montreal: {
    thin: "PPNeueMontreal-Thin",
    book: "PPNeueMontreal-Book",
    medium: "PPNeueMontreal-Medium",
    italic: "PPNeueMontreal-Italic",
    semiboldItalic: "PPNeueMontreal-SemiboldItalic",
    bold: "PPNeueMontreal-Bold",
  },
};

export const FontSources: Record<string, FontSource> = {
  "PPEditorialOld-Regular": require("../assets/images/ppeditorialold-regular.otf"),
  "PPEditorialOld-Italic": require("../assets/images/ppeditorialold-italic.otf"),
  "PPEditorialOld-Ultralight": require("../assets/images/ppeditorialold-ultralight.otf"),
  "PPEditorialOld-UltralightItalic": require("../assets/images/ppeditorialold-ultralightitalic.otf"),
  "PPEditorialOld-Ultrabold": require("../assets/images/ppeditorialold-ultrabold.otf"),
  "PPEditorialOld-UltraboldItalic": require("../assets/images/ppeditorialold-ultrabolditalic.otf"),
  "PPNeueMontreal-Thin": require("../assets/images/ppneuemontreal-thin.otf"),
  "PPNeueMontreal-Book": require("../assets/images/ppneuemontreal-book.otf"),
  "PPNeueMontreal-Medium": require("../assets/images/ppneuemontreal-medium.otf"),
  "PPNeueMontreal-Italic": require("../assets/images/ppneuemontreal-italic.otf"),
  "PPNeueMontreal-SemiboldItalic": require("../assets/images/ppneuemontreal-semibolditalic.otf"),
  "PPNeueMontreal-Bold": require("../assets/images/ppneuemontreal-bold.otf"),
};
