import 'reflect-metadata';
import { DECORATOR_ACTION } from '../base/consts';
import { createObjectProperties, extractObjectProperties } from '../helpers/propertyListCreator';
import { IAction } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Action: MethodDecorator = (target, propertyKey) => {
  const methodName = propertyKey.toString();
  
  createObjectProperties<IAction>(target, DECORATOR_ACTION, {
    methodName,
    modelName: ''
  });
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getAction(target: Object): IAction[] {
  return extractObjectProperties(target, DECORATOR_ACTION);
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
