export type BackingCalculatorInputs = {
  quiltWidth: string;
  quiltLength: string;
  backingWidth: string;
  backingMargin: string;
};

export const toNumber = (text: string) => {
  const parsed = parseFloat(text);
  return isNaN(parsed) ? 0 : parsed;
};

const roundUpToQuarter = (yards: number) => Math.ceil(yards * 4) / 4;

export type BackingOption = {
  method: "Normal" | "Rotated" | "Diagonal";
  yardage: number;
  seams: number;
};

export type BackingResult = {
  options: BackingOption[];
};

export const calculateBackingOptions = (
  input: BackingCalculatorInputs,
): BackingResult => {
  const quiltWidth = toNumber(input.quiltWidth);
  const quiltLength = toNumber(input.quiltLength);
  const backingWidth = toNumber(input.backingWidth);
  const backingMargin = toNumber(input.backingMargin);

  const requiredWidth = quiltWidth + backingMargin * 2;
  const requiredLength = quiltLength + backingMargin * 2;

  const stripsNeeded = (dimension: number) =>
    Math.ceil(dimension / backingWidth);

  const normalStrips = stripsNeeded(requiredWidth);
  const rotatedStrips = stripsNeeded(requiredLength);

  const normal: BackingOption = {
    method: "Normal",
    yardage: roundUpToQuarter((normalStrips * requiredLength) / 36),
    seams: normalStrips - 1,
  };

  const rotated: BackingOption = {
    method: "Rotated",
    yardage: roundUpToQuarter((rotatedStrips * requiredWidth) / 36),
    seams: rotatedStrips - 1,
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
      yardage: roundUpToQuarter(totalLength / 36),
      seams: 1,
    });
  }
  return {
    options: options.sort((a, b) => {
      return a.yardage - b.yardage;
    }),
  };
};
