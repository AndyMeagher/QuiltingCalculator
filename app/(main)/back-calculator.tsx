import { ContentCard } from "@/components/content-card";
import FormField from "@/components/form-field";
import { Colors, Fonts } from "@/constants/theme";
import {
  BackingCalculatorInputs,
  BackingResult,
  calculateBackingOptions,
} from "@/utils/calculator";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BackCalculatorScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BackingCalculatorInputs>();

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [result, setResult] = useState<BackingResult | undefined>();

  const onSubmit: SubmitHandler<BackingCalculatorInputs> = (data) => {
    const calcResult = calculateBackingOptions(data);
    setResult(calcResult);
  };

  const watchedValues = watch();

  useEffect(() => {
    if (!result) return;
    const { quiltWidth, quiltLength, backingWidth, backingOverage, units } =
      watchedValues;
    if (quiltWidth && quiltLength && backingWidth) {
      setResult(
        calculateBackingOptions({
          quiltWidth,
          quiltLength,
          backingWidth,
          backingOverage,
          units,
        }),
      );
    }
  }, [
    watchedValues.quiltWidth,
    watchedValues.quiltLength,
    watchedValues.backingWidth,
    watchedValues.backingOverage,
    watchedValues.units,
  ]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={require("../../assets/images/Union.png")} />
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
            label="Overage"
            name="backingOverage"
            control={control}
            error={errors.backingOverage?.message}
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
            defaultValue="inches"
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
                      style={{
                        fontFamily: Fonts.montreal.medium,
                        fontSize: 16,
                      }}
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

          <TouchableOpacity
            style={{
              alignItems: "center",
              marginTop: 16,
            }}
            onPress={() => {
              reset();
              setResult(undefined);
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.montreal.bold,
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
        </ContentCard>
      </View>
      {result && (
        <Text
          style={{
            fontFamily: Fonts.montreal.medium,
            fontSize: 16,
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          Your Options:
        </Text>
      )}
      <FlatList
        data={result?.options ?? []}
        keyExtractor={(item, index) => `${item.seamDirection}-${index}`}
        horizontal
        snapToInterval={Dimensions.get("window").width - 64}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: option }) => (
          <View
            style={{
              width: Dimensions.get("window").width - 64,
              paddingHorizontal: 8,
            }}
          >
            <ContentCard
              key={option.seamDirection}
              color={Colors.branding.blue}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 16,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ height: 20, width: 20, marginRight: 8 }}
                    source={require("../../assets/images/Union.png")}
                  />
                  <Text
                    style={{ fontFamily: Fonts.montreal.medium, fontSize: 16 }}
                  >
                    {option.seamDirection === "None"
                      ? "No Seams Needed"
                      : `${option.seamDirection} Seams:`}
                  </Text>
                </View>
                {option.seamDirection != "None" && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(main)/seam-diagram",
                        params: { direction: option.seamDirection },
                      })
                    }
                  >
                    <Ionicons name="information-circle-outline" size={24} />
                  </TouchableOpacity>
                )}
              </View>
              <View>
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
                    {option.total.toFixed(2)}
                  </Text>
                  <Text style={{ fontFamily: Fonts.montreal.thin }}>
                    {option.outputUnit === "yards" ? "Yards" : "Meters"}
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
                    {option.outputUnit === "yards"
                      ? (option.total * 36).toFixed(0)
                      : (option.total * 100).toFixed(0)}
                  </Text>
                  <Text style={{ fontFamily: Fonts.montreal.thin }}>
                    {option.outputUnit === "yards" ? "Inches" : "Centimeters"}
                  </Text>
                </View>
              </View>
            </ContentCard>
          </View>
        )}
      />
    </ScrollView>
  );
}
