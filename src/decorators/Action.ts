import 'reflect-metadata';
import { IAction } from '../interfaces/IAction';
import { DECORATOR_ACTION } from '../interfaces/Symbols';
import { createObjectProperties, extractObjectList } from '../helpers/propertyListCreator';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Action: MethodDecorator = (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<IAction>(target, DECORATOR_ACTION, methodName, {
    methodName,
    modelName: '',
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getAction(target: Object): IAction[] {
  return extractObjectList(target, DECORATOR_ACTION, 'function');
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
