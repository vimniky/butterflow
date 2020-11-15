export default class Library<K extends string, V> {
  private data: Partial<Record<K, V>> = {};

  constructor(data: Partial<Record<K, V>> = {}) {
    this.data = data;
  }

  get rawData() {
    return this.data;
  }

  exists(key: K): boolean {
    return this.data[key] !== undefined;
  }

  getItem(key: K): V | undefined {
    return this.data[key];
  }

  register(key: K, value: V): boolean {
    if (this.exists(key)) {
      console.warn(`Function ${key} already exists`);
      return false;
    }
    this.data[key] = value;
    return true;
  }

  unRegister(key: K): boolean {
    if (!this.exists(key)) {
      console.warn(`Function ${key} don't exists`);
      return false;
    }
    delete this.data[key];
    return true;
  }

  unRegisterAll(keys: K[]): boolean[] {
    return keys.map((key) => this.unRegister(key));
  }
}
