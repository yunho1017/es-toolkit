import { describe, expect, it } from 'vitest';
import { differenceKeys } from './differenceKeys';

describe('differenceKeys', () => {
  it('should return empty array when objects are identical', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(differenceKeys(obj1, obj2)).toEqual([]);
  });

  it('should detect added keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };
    expect(differenceKeys(obj1, obj2)).toEqual(['b']);
  });

  it('should detect deleted keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    expect(differenceKeys(obj1, obj2)).toEqual(['b']);
  });

  it('should detect modified values', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(differenceKeys(obj1, obj2)).toEqual(['b']);
  });

  it('should handle nested objects with dot notation', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 4 } };
    expect(differenceKeys(obj1, obj2)).toEqual(['b.d']);
  });

  it('should handle multiple nested differences', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4,
        },
      },
    };
    const obj2 = {
      a: 1,
      b: {
        c: 5,
        d: {
          e: 3,
          f: 6,
          g: 7,
        },
      },
    };
    expect(differenceKeys(obj1, obj2).sort()).toEqual(['b.c', 'b.d.f', 'b.d.g'].sort());
  });

  it('should handle date objects', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-02');
    const obj1 = { date: date1 };
    const obj2 = { date: date2 };
    expect(differenceKeys(obj1, obj2)).toEqual(['date']);
  });

  it('should handle arrays with different values', () => {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [1, 2, 4] };
    expect(differenceKeys(obj1, obj2)).toEqual(['arr']);
  });

  it('should handle deeply nested array changes', () => {
    const obj1 = { a: { b: { arr: [1, 2, 3] } } };
    const obj2 = { a: { b: { arr: [1, 2, 4] } } };
    expect(differenceKeys(obj1, obj2)).toEqual(['a.b.arr']);
  });

  it('should handle mixed nested changes', () => {
    const obj1 = {
      a: 1,
      b: {
        c: [1, 2],
        d: { e: 3 },
      },
    };
    const obj2 = {
      a: 1,
      b: {
        c: [1, 3],
        d: { e: 4 },
      },
    };
    expect(differenceKeys(obj1, obj2).sort()).toEqual(['b.c', 'b.d.e'].sort());
  });

  it('should handle mixed nested changes', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 3,
        d: { e: 3 },
      },
    };
    const obj2 = {
      a: 1,
      b: {
        c: { f: 3 },
        d: { e: 4 },
      },
    };
    expect(differenceKeys(obj1, obj2).sort()).toEqual(['b.c', 'b.d.e'].sort());
  });
});
