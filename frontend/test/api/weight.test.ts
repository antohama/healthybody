import { addWeight } from '../../src/api/weight';

describe('addWeight (API)', () => {
  it('sends correct request and returns parsed response', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        value: 80,
        date: '2025-01-01',
      }),
    } as Response);

    const result = await addWeight({ value: 80 });

    expect(fetchMock).toHaveBeenCalledWith(
      '/weight',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: 80 }),
      }),
    );

    expect(result).toEqual({
      value: 80,
      date: '2025-01-01',
    });

    fetchMock.mockRestore();
  });

  it('throws when API returns error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: { code: 'INVALID_WEIGHT' },
      }),
    } as Response);

    await expect(addWeight({ value: -1 })).rejects.toThrow();

    vi.restoreAllMocks();
  });
});
