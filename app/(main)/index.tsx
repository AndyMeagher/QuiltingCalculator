import { ContentCard } from "@/components/content-card";
import FormField from "@/components/form-field";
import { Colors, Fonts } from "@/constants/theme";
import {
  BackingCalculatorInputs,
  BackingResult,
  calculateBackingOptions,
} from "@/utils/calculator";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BackingCalculatorInputs>();

  const insets = useSafeAreaInsets();

  const [result, setResult] = useState<BackingResult | undefined>();

  const onSubmit: SubmitHandler<BackingCalculatorInputs> = (data) => {
    const calcResult = calculateBackingOptions(data);
    setResult(calcResult);
  };

  const watchedValues = watch();
  useEffect(() => {
    if (!result) return;
    const { quiltWidth, quiltLength, backingWidth, backingMargin, units } = watchedValues;
    if (quiltWidth && quiltLength && backingWidth) {
      setResult(calculateBackingOptions({ quiltWidth, quiltLength, backingWidth, backingMargin, units }));
    }
  }, [watchedValues.quiltWidth, watchedValues.quiltLength, watchedValues.backingWidth, watchedValues.backingMargin, watchedValues.units]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image source={require("../../assets/images/Union.png")}></Image>
        <Text
          style={{
            fontFamily: Fonts.editorial.italic,
            fontSize: 24,
            paddingLeft: 8,
            paddingBottom: 8,
          }}
        >
          Backing Calculator
        </Text>
      </View>

      <Text
        style={{
          fontFamily: Fonts.montreal.medium,
          fontSize: 14,
          paddingBottom: 24,
        }}
      >
        Calculate how much fabric you need for your quilt top
      </Text>
      <ContentCard color={Colors.branding.blue}>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <FormField
            style={{ flex: 1, marginRight: 8 }}
            label="Quilt Width"
            name="quiltWidth"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.quiltWidth?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.branding.blue,
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
            label="Quilt Length"
            name="quiltLength"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.quiltLength?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.branding.blue,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            )}
          />
        </View>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <FormField
            style={{ flex: 1, marginRight: 8 }}
            label="Width of Fabric"
            name="backingWidth"
            control={control}
            rules={{ required: "This field is required" }}
            error={errors.backingWidth?.message}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  backgroundColor: "white",
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.branding.blue,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
              />
            )}
          />
        </View>
        <FormField
          style={{ marginBottom: 16 }}
          label="Margin"
          name="backingMargin"
          control={control}
          error={errors.backingMargin?.message}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.branding.blue,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="decimal-pad"
            />
          )}
        />
        <FormField
          label="Units"
          name="units"
          control={control}
          error={errors.units?.message}
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: 8, marginBottom: 16 }}>
              {(["inches", "centimeters"] as const).map((unit) => (
                <TouchableOpacity
                  key={unit}
                  onPress={() => onChange(unit)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: Colors.branding.blue,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {value === unit && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: Colors.branding.blue,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{ fontFamily: Fonts.montreal.medium, fontSize: 16 }}
                  >
                    {unit === "inches" ? "Inches" : "Centimeters"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.branding.blue,
            paddingVertical: 12,
            paddingHorizontal: 24,
            marginTop: 12,
            borderRadius: 24,
            alignItems: "center",
            borderWidth: 1,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ fontFamily: Fonts.montreal.bold, fontSize: 16 }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ContentCard>

      {result && (
        <ContentCard color={Colors.branding.blue}>
          <View style={{ flexDirection: "row", paddingBottom: 16 }}>
            <Image
              style={{ height: 20, width: 20, marginRight: 8 }}
              source={require("../../assets/images/Union.png")}
            ></Image>
            <Text style={{ fontFamily: Fonts.montreal.medium, fontSize: 16 }}>
              You'll need:
            </Text>
          </View>
          <View key={result.options[0].method}>
            <View
              style={{
                flex: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.branding.blue,
                alignItems: "center",
                marginBottom: 16,
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.montreal.bold,
                  color: Colors.branding.blue,
                  flex: 1,
                  fontSize: 32,
                }}
              >
                {result.options[0].total.toFixed(2)}
              </Text>
              <Text style={{ fontFamily: Fonts.montreal.thin }}>
                {result.options[0].outputUnit === "yards" ? "Yards" : "Meters"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.branding.blue,
                alignItems: "center",
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.montreal.bold,
                  color: Colors.branding.blue,
                  flex: 1,
                  fontSize: 32,
                }}
              >
                {result.options[0].outputUnit === "yards"
                  ? (result.options[0].total * 36).toFixed(0)
                  : (result.options[0].total * 100).toFixed(0)}
              </Text>
              <Text style={{ fontFamily: Fonts.montreal.thin }}>
                {result.options[0].outputUnit === "yards" ? "Inches" : "Centimeters"}
              </Text>
            </View>
            {/* <Text>
                {option.method} {option.yardage.toFixed(2)} yards —{" "}
                {option.seams} seam
                {option.seams !== 1 ? "s" : ""}
              </Text> */}
          </View>
        </ContentCard>
      )}
    </ScrollView>
  );
}
