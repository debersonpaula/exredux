import 'reflect-metadata';
import { createObjectProperties, extractObjectList } from '../helpers/propertyListCreator';
import { IInject } from '../interfaces/IInject';
import { DECORATOR_INJECT } from '../interfaces/Symbols';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Inject: PropertyDecorator = (target, propertyKey) => {
  const propertyType = Reflect.getMetadata('design:type', target, propertyKey);

  createObjectProperties<IInject>(target, DECORATOR_INJECT, propertyKey.toString(), {
    propertyName: propertyKey.toString(),
    typeName: propertyType.name,
    targetName: target.constructor.name,
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getInject(target: Object): IInject[] {
  return extractObjectList(target, DECORATOR_INJECT, 'object');
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
