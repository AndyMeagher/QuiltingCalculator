import FormField from "@/components/form-field";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  BackingCalculatorInputs,
  BackingResult,
  calculateBackingOptions,
} from "@/utils/calculator";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BackingCalculatorInputs>();

  const insets = useSafeAreaInsets();

  const [result, setResult] = useState<BackingResult | undefined>();

  const onSubmit: SubmitHandler<BackingCalculatorInputs> = (data) => {
    const calcResult = calculateBackingOptions(data);
    setResult(calcResult);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
      }}
    >
      <ThemedView>
        {result && (
          <ThemedView style={{ marginVertical: 16 }}>
            <ThemedText>Your options:</ThemedText>
            {result.options.map((option) => (
              <ThemedView key={option.method}>
                <ThemedText>
                  {option.method} {option.yardage.toFixed(2)} yards —{" "}
                  {option.seams} seam
                  {option.seams !== 1 ? "s" : ""}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}

        <ThemedText type="title">Backing Fabric:</ThemedText>
        <ThemedView style={{ flexDirection: "row", marginBottom: 16 }}>
          <FormField
            style={{ flex: 1, marginRight: 8 }}
            label="Width"
            name="backingWidth"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.backingWidth?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 10,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            )}
          />
        </ThemedView>

        <ThemedText type="title">Quilt Top:</ThemedText>
        <ThemedView style={{ flexDirection: "row", marginBottom: 16 }}>
          <FormField
            style={{ flex: 1, marginRight: 8 }}
            label="Width"
            name="quiltWidth"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.quiltWidth?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 10,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            )}
          />
          <FormField
            style={{ flex: 1 }}
            label="Length"
            name="quiltLength"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.quiltLength?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 10,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            )}
          />
        </ThemedView>
        <ThemedText type="title">Overage:</ThemedText>

        <FormField
          style={{}}
          label="Margin"
          name="backingMargin"
          control={control}
          error={errors.backingMargin?.message}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 10,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="decimal-pad"
            />
          )}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ScrollView>
  );
}
