import 'reflect-metadata';
import { DECORATOR_TRIGGER } from '../base/Consts';
import {
  createObjectProperties,
  extractObjectProperties
} from '../helpers/propertyListCreator';
import { ITrigger, Type } from '../base/interfaces';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Trigger = (
  listenToModel: Type<any>,
  listenToMethod: string
): MethodDecorator => (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<ITrigger>(target, DECORATOR_TRIGGER, {
    listenToModel,
    listenToMethod,
    methodName,
    modelName: ''
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getTrigger(target: Object): ITrigger[] {
  return extractObjectProperties(target, DECORATOR_TRIGGER);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
