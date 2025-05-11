// test behaviour not implementations
import { isPlainObject } from '../src/lib/helpers';

test('Return false if value is a special object ie. Map', () => {
  const value = new Map();
  expect(isPlainObject(value)).toBe(false);
});

test('Return false if value is a special object ie. Set', () => {
  const value = new Set();
  expect(isPlainObject(value)).toBe(false);
});

test('Return true if value is a valid object created via {}', () => {
  const value = {
    name: 'John',
    age: 21,
  };
  expect(isPlainObject(value)).toBe(true);
});

test('Return true if value is a valid object created via new Object()', () => {
  const value = new Object({
    name: 'John',
    age: 21,
  });
  expect(isPlainObject(value)).toBe(true);
});
