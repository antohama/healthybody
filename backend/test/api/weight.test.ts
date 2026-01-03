import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app';

describe('POST /weight', () => {
  let app: ReturnType<typeof buildApp>;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns ok status when input is valid', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: 85.3,
        date: '2026-01-01',
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      value: 85.3,
      date: '2026-01-01',
    });
  });

  it('returns ok status and current date if date is ommitted', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: 34,
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      value: 34,
      date: new Date().toISOString().slice(0, 10),
    });
  });

  it('returns error status when date is wrongly formatted', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: 100,
        date: '01/01/2025',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns error status when value is ommitted', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {},
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns error status when value is negative', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: -1,
        date: '2026-01-01',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns error status when value is zero', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: 0,
        date: '2026-01-01',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns error status when value is non-numeric', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: 'fifty',
        date: '2026-01-01',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns error status when value is null', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/weight',
      payload: {
        value: null,
        date: '2026-01-01',
      },
    });

    expect(res.statusCode).toBe(400);
  });
});
