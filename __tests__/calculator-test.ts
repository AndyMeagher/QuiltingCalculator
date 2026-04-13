import { calculateBackingOptions } from "@/utils/calculator";

// export type BackingCalculatorInputs = {
//   quiltWidth: string;
//   quiltLength: string;
//   backingWidth: string;
//   backingMargin: string;
//   units: "inches" | "centimeters";
// };

describe('Backing Calculator', () => {
  it('Calculates Normal Dimensions Correctly', () => {
    const optionsList = calculateBackingOptions({quiltLength: "54", quiltWidth: "45", backingWidth: "42", backingOverage: "4", units: "inches"})
    const normalOption = optionsList.options.find(item =>{
     return item.seamDirection != "diagonal"
    })
    expect(normalOption?.seams).toBe(1); 
    expect(normalOption?.total).toBe(3); 
  });

  it('Calculates Large Dimensions Correctly', () => {
    const optionsList = calculateBackingOptions({quiltLength: "110", quiltWidth: "100", backingWidth: "42", backingOverage: "2", units: "inches"})
    const normalOption = optionsList.options.find(item =>{
     return item.seamDirection != "diagonal"
    })
    expect(normalOption?.seams).toBe(2); 
    expect(normalOption?.total).toBe(8.75); 
  });

  it('Calculates Extra Small Dimensions Correctly', () => {
    const optionsList = calculateBackingOptions({quiltLength: "5", quiltWidth: "4", backingWidth: "4", backingOverage: "0", units: "inches"})
    const normalOption = optionsList.options.find(item =>{
     return item.seamDirection != "diagonal"
    })
    expect(normalOption?.seams).toBe(0); 
    expect(normalOption?.total).toBe(0.25); 
  });
});