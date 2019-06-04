import 'reflect-metadata';
import { DECORATOR_ACTION } from '../base/consts';
import {
  createObjectProperties,
  extractObjectList
} from '../helpers/propertyListCreator';
import { IAction } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Action: MethodDecorator = (target, propertyKey) => {
  const methodName = propertyKey.toString();

  createObjectProperties<IAction>(target, DECORATOR_ACTION, methodName, {
    methodName,
    modelName: ''
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getAction(target: Object): IAction[] {
  return extractObjectList(target, DECORATOR_ACTION);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
