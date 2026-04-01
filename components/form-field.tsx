import { Fonts } from "@/constants/theme";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { StyleProp, Text, View, ViewStyle } from "react-native";

type FormFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  error?: string;
  render: React.ComponentProps<typeof Controller<T>>["render"];
  style?: StyleProp<ViewStyle>;
};

function FormField<T extends FieldValues>({
  label,
  name,
  control,
  rules,
  error,
  render,
  style,
  defaultValue,
}: FormFieldProps<T>) {
  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: Fonts.montreal.medium,
          fontSize: 16,
          paddingBottom: 8,
        }}
      >
        {label}
      </Text>
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        rules={rules}
        render={render}
      />
      {error && (
        <Text
          style={{
            color: "red",
            paddingTop: 8,
            fontFamily: Fonts.montreal.medium,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

export default FormField;
