import { describe, it, expect } from 'vitest';
import { addWeight } from '../../src/domain/weight';

describe('add weight', () => {
  it('defaults date to today', () => {
    const res = addWeight({
      value: 80,
    });

    expect(res).toEqual({
      value: 80,
      date: new Date().toISOString().slice(0, 10),
    });
  });

  it('rejects non-positive value', () => {
    expect(() =>
      addWeight({
        value: 0,
        date: '2025-01-01',
      }),
    ).toThrow();
  });
});
