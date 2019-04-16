import { GenericClassDecorator, Type, DECORATOR_REDUX_MODEL } from './Types';
import 'reflect-metadata';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include options on state machine
 */
export const Model: GenericClassDecorator<Type<any>> = (target: Type<any>) => {
  const modelName = target.name;
  Reflect.defineMetadata(DECORATOR_REDUX_MODEL, modelName, target);
};
