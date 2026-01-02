export type WeightEntry = {
  value: number;
  date?: string;
};

export function addWeight(input: WeightEntry) {
  if (input.value <= 0) throw new Error('Weight must be positive');

  return {
    value: input.value,
    date: input.date ?? new Date().toISOString().slice(0, 10),
  };
}
