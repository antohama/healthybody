import { WeightEntry } from './weight';

export interface WeightRepository {
  add(entry: WeightEntry): Promise<void>;
}
