import { isEqual } from '../predicate/isEqual.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * Finds the key paths of the differences between two objects.
 * Returns an array of key paths where values differ.
 * Nested paths are represented with dot notation.
 *
 * @param {Record<string, any>} lhs - left-hand side object
 * @param {Record<string, any>} rhs - right-hand side object
 * @returns {string[]} Array of key paths where values differ
 *
 * @example
 * const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { a: 1, b: { c: 2, d: 4 } };
 * differenceKeys(obj1, obj2); // ['b.d']
 *
 * @example
 * const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { a: 1, b: { c: { f: 4 }, d: 4 } };
 * differenceKeys(obj1, obj2); // ['b.c', 'b.d']
 */

export function differenceKeys(lhs: Record<string, any>, rhs: Record<string, any>): string[] {
  return differenceKeysImpl(lhs, rhs);
}

function pathToString(path: string[]) {
  return path.join('.');
}

function differenceKeysImpl(lhs: Record<string, any>, rhs: Record<string, any>, prefixPath: string[] = []): string[] {
  const differences: string[] = [];
  const keys = new Set([...Object.keys(lhs), ...Object.keys(rhs)]);

  keys.forEach(key => {
    const lValue = lhs[key];
    const rValue = rhs[key];
    const currentPath = [...prefixPath, key];

    if (lValue === undefined || rValue === undefined) {
      differences.push(pathToString(currentPath));
      return;
    }

    if (isPlainObject(lValue) && isPlainObject(rValue)) {
      const nestedDiffs = differenceKeysImpl(lValue, rValue, currentPath);
      differences.push(...nestedDiffs);
      return;
    }

    if (!isEqual(lValue, rValue)) {
      differences.push(pathToString(currentPath));
      return;
    }
  });

  return differences;
}
