import 'reflect-metadata';
import { GenericClassDecorator, Type, DECORATOR_REDUX_MODEL } from './Types';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Model: GenericClassDecorator<Type<any>> = (target: Type<any>) => {
  const modelName = target.name;
  Reflect.defineMetadata(DECORATOR_REDUX_MODEL, modelName, target);
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getModelName(target: any): string {
  return Reflect.getMetadata(DECORATOR_REDUX_MODEL, target) || '';
}
