interface StackItem<K = string, V = any> {
  key: K;
  value: V;
}

export class MapStack<T = any> implements Iterable<StackItem<string, T>> {
  items: StackItem[] = [];

  constructor(items: Record<string, any> = {}) {
    for (const key in items) {
      this.items.push({
        key: key,
        value: items[key],
      });
    }
  }

  push(key: string, value: T) {
    this.delete(key);
    this.items.push({ key, value });
  }

  pop() {
    this.items.pop();
  }

  delete(key: string): boolean {
    const index = this.indexOf(key);
    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true;
  }

  clear() {
    this.items = [];
  }

  indexOf(key: string): number {
    return this.items.findIndex(item => {
      return item.key === key;
    });
  }

  get(key: string): T | undefined {
    const item = this.items.find(item => {
      return item.key === key;
    });

    if (!item) {
      return undefined;
    }

    return item.value;
  }

  has(key: string): boolean {
    return !!this.get(key);
  }

  set(key: string, value: T) {
    const index = this.indexOf(key);
    if (index === -1) {
      throw new Error(
        `Key '${key}' does not exist on ${JSON.stringify(this)}.`
      );
    }

    this.items[index] = { key, value };
  }

  get first(): T | undefined {
    return this.items[0]?.value;
  }

  get last(): T | undefined {
    return this.items[this.items.length - 1]?.value;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get length() {
    return this.items.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    let items = this.items;

    return {
      next(): IteratorResult<StackItem<string, T>> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true, value: null };
        }
      },
    };
  }
}
