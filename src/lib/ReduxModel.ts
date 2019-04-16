import { GenericClassDecorator, Type, DECORATOR_REDUX_MODEL } from './Types';
import 'reflect-metadata';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include options on state machine
 * @param name Optional = Name of Model in store
 */
export const Model = (name?: string): GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    const modelName = name || target.name;
    Reflect.defineMetadata(DECORATOR_REDUX_MODEL, modelName, target);
  };
};
