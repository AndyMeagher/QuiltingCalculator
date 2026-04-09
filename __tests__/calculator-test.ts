import { calculateBackingOptions } from "@/utils/calculator";

// export type BackingCalculatorInputs = {
//   quiltWidth: string;
//   quiltLength: string;
//   backingWidth: string;
//   backingMargin: string;
//   units: "inches" | "centimeters";
// };

describe('Backing Calculator', () => {
  it('Calculates Correctly', () => {
    const optionsList = calculateBackingOptions({quiltLength: "54", quiltWidth: "45", backingWidth: "42", backingMargin: "4", units: "inches"})
    const normalOption = optionsList.options.find(item =>{
     return item.seamDirection != "diagonal"
    })
    expect(normalOption?.seams).toBe(1); 
    expect(normalOption?.total).toBe(3); 

  });
});