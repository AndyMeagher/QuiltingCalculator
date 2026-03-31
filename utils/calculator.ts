export type BackingCalculatorInputs = {
  quiltWidth: string;
  quiltLength: string;
  backingWidth: string;
  backingMargin: string;
  units: "inches" | "centimeters";
};

export const toNumber = (text: string) => {
  const parsed = parseFloat(text);
  return isNaN(parsed) ? 0 : parsed;
};

const roundUpToQuarter = (yards: number) => Math.ceil(yards * 4) / 4;

export type BackingOption = {
  method: "Normal" | "Rotated" | "Diagonal";
  total: number;
  outputUnit: "yards" | "meters";
  seams: number;
};

export type BackingResult = {
  options: BackingOption[];
};

const roundUpToTenth = (value: number): number => Math.ceil(value * 10) / 10;

export const calculateBackingOptions = (
  input: BackingCalculatorInputs,
): BackingResult => {
  const quiltWidth = toNumber(input.quiltWidth);
  const quiltLength = toNumber(input.quiltLength);
  const backingWidth = toNumber(input.backingWidth);
  const backingMargin = toNumber(input.backingMargin);

  const isCm = input.units === "centimeters";
  const conversionFactor = isCm ? 100 : 36;
  const roundFn = isCm ? roundUpToTenth : roundUpToQuarter;

  const requiredWidth = quiltWidth + backingMargin * 2;
  const requiredLength = quiltLength + backingMargin * 2;

  const stripsNeeded = (dimension: number) =>
    Math.ceil(dimension / backingWidth);

  const normalStrips = stripsNeeded(requiredWidth);
  const rotatedStrips = stripsNeeded(requiredLength);

  const normal: BackingOption = {
    method: "Normal",
    total: roundFn((normalStrips * requiredLength) / conversionFactor),
    seams: normalStrips - 1,
    outputUnit: isCm ? "meters" : "yards",
  };

  const rotated: BackingOption = {
    method: "Rotated",
    total: roundFn((rotatedStrips * requiredWidth) / conversionFactor),
    seams: rotatedStrips - 1,
    outputUnit: isCm ? "meters" : "yards",
  };

  const denominator = 2 * backingWidth - requiredWidth;

  const diagonalEligible =
    requiredWidth <= backingWidth * 1.5 && denominator > 0;

  let options: BackingOption[] = [];
  options.push(normal, rotated);

  if (diagonalEligible) {
    const extraLength =
      (requiredLength * (requiredWidth - backingWidth)) / denominator;

    const totalLength = requiredLength + extraLength;

    options.push({
      method: "Diagonal",
      total: roundFn(totalLength / conversionFactor),
      seams: 1,
      outputUnit: isCm ? "meters" : "yards",
    });
  }
  return {
    options: options.sort((a, b) => {
      return a.total - b.total;
    }),
  };
};
