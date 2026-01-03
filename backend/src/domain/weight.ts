export type WeightEntry = {
  value: number;
  date?: string;
};

export async function addWeight(
  repo: { add: (entry: WeightEntry) => Promise<void> },
  input: WeightEntry,
): Promise<WeightEntry> {
  if (input.value <= 0) throw new Error('Weight must be positive');

  const entry: WeightEntry = {
    value: input.value,
    date: input.date ?? new Date().toISOString().slice(0, 10),
  };

  await repo.add(entry);

  return entry;
}
