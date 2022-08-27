import { describe, it, expect } from 'vitest';

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  it('serial test', async () => {
    expect(true).toBe(true);
  });
});
