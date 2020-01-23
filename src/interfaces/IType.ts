export interface IType<T> {
  new (...args: any[]): T;
}
