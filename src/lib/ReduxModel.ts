import 'reflect-metadata';
import { GenericClassDecorator, Type, DECORATOR_REDUX_MODEL, DECORATOR_REDUX_DEPENDENCY } from './Types';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include options on state machine
 */
export const Model: GenericClassDecorator<Type<any>> = (target: Type<any>) => {
  const modelName = target.name;
  Reflect.defineMetadata(DECORATOR_REDUX_MODEL, modelName, target);
  // generate metadata for parameters in constructor
  const params = Reflect.getMetadata('design:paramtypes', target) || [];
  const paramTypeNames = params.map((item) => item.name);
  Reflect.defineMetadata(DECORATOR_REDUX_DEPENDENCY, paramTypeNames, target);
};

