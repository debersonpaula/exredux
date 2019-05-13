// --------------------------------------------------------------------
/**
 * Type for what object is instances of
 */
export interface Type<T> {
  new (...args: any[]): T;
}
// --------------------------------------------------------------------
/**
 * Generic ClassDecorator type
 */
export type GenericClassDecorator<T> = (target: T) => void;
export type GenericMethodDecorator<T> = (target: T, key: string) => void;
// --------------------------------------------------------------------
export const DECORATOR_REDUX_ACTION = Symbol('DECORATOR_REDUX_ACTION');
export const DECORATOR_REDUX_ACTION_LISTENER = Symbol('DECORATOR_REDUX_ACTION_LISTENER');
export const DECORATOR_REDUX_DEPENDENCY = Symbol('DECORATOR_REDUX_DEPENDENCY');
export const DECORATOR_REDUX_INJECT = Symbol('DECORATOR_REDUX_INJECT');
export const DECORATOR_REDUX_MODEL = Symbol('DECORATOR_REDUX_MODEL');
// --------------------------------------------------------------------
/**
 * 
 */
export interface IDispatcherParams {
  type: string;
  payload: any;
  modelName: string;
}