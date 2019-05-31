import 'reflect-metadata';
import { DECORATOR_ACTION } from '../base/Consts';
import { createObjectProperties, extractObjectProperties } from '../helpers/propertyListCreator';
import { IAction } from '../base/interfaces';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Action: MethodDecorator = (target, propertyKey) => {
  const methodName = propertyKey.toString();
  const className = target.constructor.name;
  
  createObjectProperties<IAction>(target, DECORATOR_ACTION, {
    methodName,
    className,
    dispatchName: `${className}.${methodName}`
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
