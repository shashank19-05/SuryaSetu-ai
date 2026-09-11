// app/utils/subsidy.ts
export function calculateSubsidy(capacityKw: number): number {
  if (capacityKw <= 0) return 0;
  
  if (capacityKw <= 2) {
    return capacityKw * 30000;
  } else if (capacityKw > 2 && capacityKw <= 3) {
    const baseSubsidy = 60000;
    const extraCapacity = capacityKw - 2;
    return baseSubsidy + (extraCapacity * 18000);
  } else {
    return 78000; // Max cap defined by the scheme
  }
}