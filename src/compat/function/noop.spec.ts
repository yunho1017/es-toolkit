import { describe, expect, it } from 'vitest';
import { noop } from '../../function';

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function');
  });

  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
  });
});
