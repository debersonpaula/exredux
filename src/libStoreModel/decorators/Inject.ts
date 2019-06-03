import 'reflect-metadata';
import { DECORATOR_INJECT } from '../base/consts';
import {
  createObjectProperties,
  extractObjectProperties
} from '../helpers/propertyListCreator';
import { IInject } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Inject: PropertyDecorator = (target, propertyKey) => {
  const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
  createObjectProperties<IInject>(target, DECORATOR_INJECT, {
    propertyName: propertyKey.toString(),
    typeName: propertyType.name
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getInject(target: Object): IInject[] {
  return extractObjectProperties(target, DECORATOR_INJECT);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
