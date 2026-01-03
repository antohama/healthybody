import { WeightEntry } from '../domain/weight';
import { WeightRepository } from '../domain/weightRepository';

export class InMemoryWeightRepository implements WeightRepository {
  private data: WeightEntry[] = [];

  async add(entry: WeightEntry): Promise<void> {
    this.data.push(entry);
  }
}
