import { http } from './http';

export type WeightDto = {
  value: number;
  date?: string;
};

export async function addWeight(input: { value: number; date?: string }): Promise<WeightDto> {
  return http<WeightDto>('/weight', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
