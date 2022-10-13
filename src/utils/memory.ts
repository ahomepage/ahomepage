export class Memory {
  public name;
  _prefix = "memory";

  constructor(name: string) {
    this.name = `${this._prefix}_${name}`;
  }
  get() {
    let result;
    try {
      result = JSON.parse(localStorage.getItem(this.name) || "null");
    } catch (_) {
      console.error(`Get memory error: ${this.name}`);
    }
    return result;
  }
  set(payload: any) {
    let content;
    try {
      content = JSON.stringify(payload);
    } catch (_) {
      console.error(`Set memory error: ${this.name} ${payload}`);
    }
    if (content) {
      localStorage.setItem(this.name, content);
    }
  }
}
