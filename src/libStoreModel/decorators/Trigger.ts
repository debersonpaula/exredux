import 'reflect-metadata';
import { DECORATOR_TRIGGER } from '../base/consts';
import {
  createObjectProperties,
  extractObjectList
} from '../helpers/propertyListCreator';
import { ITrigger, Type } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Trigger = (
  listenToModel: Type<any>,
  listenToMethod: string
): MethodDecorator => (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<ITrigger>(target, DECORATOR_TRIGGER, methodName, {
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
  return extractObjectList(target, DECORATOR_TRIGGER);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
