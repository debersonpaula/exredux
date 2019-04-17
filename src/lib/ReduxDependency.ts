import 'reflect-metadata';
import { DECORATOR_REDUX_DEPENDENCY, Type } from './Types';
// ----------------------------------------------------------------------------
// --- INTERFACE --------------------------------------------------------------
// ----------------------------------------------------------------------------
interface IDependency {
  propertyName: string;
  modelName: string;
}
export type IDependencies = IDependency[];
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Dependency = (model: Type<any>) => (target: any, key: string) => {
  const existingDependencies = getDependencies(target);
  
  existingDependencies.push({
    propertyName: key,
    modelName: model.name
  });

  Reflect.defineMetadata(DECORATOR_REDUX_DEPENDENCY, existingDependencies, target);
}
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getDependencies(target: any): IDependencies {
  return Reflect.getMetadata(DECORATOR_REDUX_DEPENDENCY, target) || [];
}

