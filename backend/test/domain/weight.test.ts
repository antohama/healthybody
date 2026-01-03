import { describe, it, expect, beforeAll } from 'vitest';
import { addWeight } from '../../src/domain/weight';

describe('add weight', () => {
  let fakeRepo: any;

  beforeAll(() => {
    fakeRepo = {
      add: async () => {},
    };
  });

  it('defaults date to today', () => {
    const res = addWeight(fakeRepo, {
      value: 80,
    });

    expect(res).toEqual({
      value: 80,
      date: new Date().toISOString().slice(0, 10),
    });
  });

  it('rejects non-positive value', () => {
    expect(() =>
      addWeight(fakeRepo, {
        value: 0,
        date: '2025-01-01',
      }),
    ).toThrow();
  });
});
