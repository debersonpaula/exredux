import 'reflect-metadata';
import { createObjectProperties, extractObjectList } from '../helpers/propertyListCreator';
import { IType } from '../interfaces/IType';
import { ITrigger } from '../interfaces/ITrigger';
import { DECORATOR_TRIGGER } from '../interfaces/Symbols';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Trigger = (listenToMethod: string, listenToModel?: IType<any>): MethodDecorator => (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<ITrigger>(target, DECORATOR_TRIGGER, methodName, {
    listenToModel,
    listenToMethod,
    methodName,
    modelName: '',
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getTrigger(target: Object): ITrigger[] {
  return extractObjectList(target, DECORATOR_TRIGGER, 'function');
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
