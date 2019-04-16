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
export const DECORATOR_REDUX_MODEL = 'DECORATOR_REDUX_MODEL';
export const DECORATOR_REDUX_ACTION = 'DECORATOR_REDUX_ACTION';
export const DECORATOR_REDUX_INJECT = 'DECORATOR_REDUX_INJECT';
// --------------------------------------------------------------------
/**
 * 
 */
export interface IDispatcherParams {
  type: string;
  payload: any;
  modelName: string;
}