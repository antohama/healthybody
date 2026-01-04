import { describe, it, expect } from 'vitest';
import { buildApp } from '../src/app';

describe('app', () => {
  it('starts', async () => {
    const app = buildApp();
    await expect(app.ready()).resolves.not.toThrow();
  });
});
