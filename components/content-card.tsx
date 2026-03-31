import React, { PropsWithChildren } from "react";
import { ColorValue, View } from "react-native";

export const ContentCard = ({
  children,
  color,
}: PropsWithChildren<{ color: ColorValue }>) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 16,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Android shadow
        elevation: 3,
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
    </View>
  );
};
