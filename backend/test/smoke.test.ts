import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('GET /health', () => {
  it('returns ok status', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});
