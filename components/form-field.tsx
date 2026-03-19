import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

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
    <ThemedView style={style}>
      <ThemedText>{label}</ThemedText>
      <Controller control={control} name={name} rules={rules} render={render} />
      {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
    </ThemedView>
  );
}

export default FormField;
