export class InstanceLoader {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(private context: Object) {}

  getInstance(name: string, ...args: any[]) {
    const instance = Object.create(this.context[name].prototype);
    instance.constructor(instance, args);
    return instance;
  }
}
