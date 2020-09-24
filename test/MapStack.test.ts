import { MapStack } from '../src';

let mapStack: MapStack;

beforeEach(() => {
  mapStack = new MapStack({ foo: 'fooValue', bar: 'barValue' });
});

test('length', () => {
  expect(mapStack.length).toEqual(2);
});

test('clear', () => {
  expect(mapStack.length).toEqual(2);
  mapStack.clear();
  expect(mapStack.length).toEqual(0);
});

test('isEmpty', () => {
  expect(mapStack.isEmpty).toEqual(false);
});

test('first', () => {
  expect(mapStack.first).toEqual('fooValue');
});

test('last', () => {
  expect(mapStack.last).toEqual('barValue');
});

test('get', () => {
  expect(mapStack.get('foo')).toEqual('fooValue');
});

test('indexOf', () => {
  expect(mapStack.indexOf('foo')).toEqual(0);
  expect(mapStack.indexOf('bar')).toEqual(1);
});

test('has', () => {
  expect(mapStack.has('foo')).toEqual(true);
  expect(mapStack.has('foobar')).toEqual(false);
});

test('set', () => {
  mapStack.set('foo', 'newFooValue');

  expect(mapStack.get('foo')).toEqual('newFooValue');

  expect(() => {
    mapStack.set('foobar', 'value');
  }).toThrowError(/Key 'foobar' does not exist on .*/);
});

test('push', () => {
  mapStack.push('foobar', 'foobarValue');

  expect(mapStack.has('foobar')).toEqual(true);
  expect(mapStack.length).toEqual(3);
  expect(mapStack.indexOf('foobar')).toEqual(2);
  expect(mapStack.get('foobar')).toEqual('foobarValue');

  // if the pushed key already exists, takes it to the last position of the stack
  mapStack.push('bar', 'newBarValue');

  expect(mapStack.last).toEqual('newBarValue');
  expect(mapStack.length).toEqual(3);
});

test('pop', () => {
  mapStack.pop();

  expect(mapStack.length).toEqual(1);
  expect(mapStack.has('bar')).toEqual(false);
  expect(mapStack.indexOf('bar')).toEqual(-1);
});

test('iterator', () => {
  let stack = [];

  for (let item of mapStack) {
    stack.push(item);
  }

  expect(stack).toEqual([
    { key: 'foo', value: 'fooValue' },
    { key: 'bar', value: 'barValue' },
  ]);
});
