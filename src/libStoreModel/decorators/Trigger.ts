import 'reflect-metadata';
import { DECORATOR_TRIGGER } from '../base/Consts';
import { createObjectProperties, extractObjectProperties } from '../helpers/propertyListCreator';
import { ITrigger, Type } from '../base/interfaces';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Trigger = (listenToModel: Type<any>, listenToMethod: string): MethodDecorator => (target, propertyKey) => {
  const methodName = propertyKey.toString();
  const className = target.constructor.name;

  createObjectProperties<ITrigger>(target, DECORATOR_TRIGGER, {
    listenToModel,
    listenToMethod,
    methodName,
    className,
    dispatchName: `${className}.${methodName}`
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
