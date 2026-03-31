import { Fonts } from "@/constants/theme";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { StyleProp, Text, View, ViewStyle } from "react-native";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
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
      <Controller control={control} name={name} rules={rules} render={render} />
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
