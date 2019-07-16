import 'reflect-metadata';
import { DECORATOR_EVENT } from '../base/consts';
import { createObjectProperties, extractObjectList } from '../helpers/propertyListCreator';
import { IEvent } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Event = (listenToMethod: string): MethodDecorator => (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<IEvent>(target, DECORATOR_EVENT, methodName, {
    listenToMethod,
    methodName,
    modelName: ''
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getEvent(target: Object): IEvent[] {
  return extractObjectList(target, DECORATOR_EVENT);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
