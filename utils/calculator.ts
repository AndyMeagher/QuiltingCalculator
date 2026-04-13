export type BackingCalculatorInputs = {
  quiltWidth: string;
  quiltLength: string;
  backingWidth: string;
  backingOverage: string;
  units: "inches" | "centimeters";
};

export const toNumber = (text: string) => {
  const parsed = parseFloat(text);
  return isNaN(parsed) ? 0 : parsed;
};

const roundUpToQuarter = (yards: number) => Math.ceil(yards * 4) / 4;

export type BackingOption = {
  seamDirection: "Horizontal" | "Vertical" | "Diagonal" | "None";
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
  const backingMargin = toNumber(input.backingOverage);

  const isCm = input.units === "centimeters";
  const conversionFactor = isCm ? 100 : 36;
  const roundFn = isCm ? roundUpToTenth : roundUpToQuarter;

  const requiredWidth = quiltWidth + backingMargin * 2;
  const requiredLength = quiltLength + backingMargin * 2;

  const stripsNeeded = (dimension: number) =>
    Math.ceil(dimension / backingWidth);

  const normalStrips = stripsNeeded(requiredWidth);
  const rotatedStrips = stripsNeeded(requiredLength);

  const normalSeams = normalStrips - 1;
  const rotatedSeams = rotatedStrips - 1;

  const normal: BackingOption = {
    seamDirection: normalSeams === 0 ? "None" : "Vertical",
    total: roundFn((normalStrips * requiredLength) / conversionFactor),
    seams: normalSeams,
    outputUnit: isCm ? "meters" : "yards",
  };

  const rotated: BackingOption = {
    seamDirection: rotatedSeams === 0 ? "None" : "Horizontal",
    total: roundFn((rotatedStrips * requiredWidth) / conversionFactor),
    seams: rotatedSeams,
    outputUnit: isCm ? "meters" : "yards",
  };

  // If both options need no seams, only keep the one using less fabric
  const seamlessOptions =
    normal.seams === 0 && rotated.seams === 0
      ? [normal.total <= rotated.total ? normal : rotated]
      : [normal, rotated];

  const denominator = 2 * backingWidth - requiredWidth;

  const diagonalEligible =
    requiredWidth <= backingWidth * 1.5 && denominator > 0;

  const options: BackingOption[] = seamlessOptions;

  if (diagonalEligible) {
    const extraLength =
      (requiredLength * (requiredWidth - backingWidth)) / denominator;

    const totalLength = requiredLength + extraLength;

    options.push({
      seamDirection: "Diagonal",
      total: roundFn(totalLength / conversionFactor),
      seams: 1,
      outputUnit: isCm ? "meters" : "yards",
    });
  }
  return { options };
};
