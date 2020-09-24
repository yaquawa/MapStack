# MapStack
An object that has characteristics of both map and stack.

## Installation
```shell script
npm i mapstack
```

## Usage

```js
import { MapStack } from 'mapstack';

let mapStack = new MapStack();

mapStack.push('key','value');
mapStack.push('key_2','value_2');
mapStack.push('key_3','value_3');

console.log(mapStack.get('key')); // => 'value'
console.log(mapStack.length); // => 2

// if push value with the old key, 
// the item will be taken to last position of the stack. 
mapStack.push('key','newValue');
console.log(mapStack.last); // => 'newValue'

// iterate the stack
for (let item of mapStack) {
    console.log(item); // => { key: ..., value: ... }
}
```

## API
For more detailed usage, see the [test file](https://github.com/yaquawa/MapStack/blob/master/test/MapStack.test.ts).

```ts
interface StackItem {
    key: string;
    value: any;
}

interface MapStack implements Iterable<StackItem> {
    items: StackItem[];
    constructor(items: Record<string, any>);
    push(key: string, value: any): void;
    pop(): void;
    delete(key: string): boolean;
    indexOf(key: string): number;
    get(key: string): any;
    clear(): void;
    has(key: string): boolean;
    set(key: string, value: any): void;
    first: any;
    last: any;
    isEmpty: boolean;
    length: number;
    [Symbol.iterator](): {
        next(): IteratorResult<StackItem>;
    };
}
```