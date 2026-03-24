import React, { PropsWithChildren } from "react";
import { ColorValue, View } from "react-native";
import { ThemedView } from "./themed-view";

export const ContentCard = ({
  children,
  color,
}: PropsWithChildren<{ color: ColorValue }>) => {
  return (
    <ThemedView
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 25,
          backgroundColor: color,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomWidth: 1,
          borderColor: "black",
        }}
      ></View>
      <View style={{ padding: 16 }}>{children}</View>
    </ThemedView>
  );
};
