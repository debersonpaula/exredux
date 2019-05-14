// tslint:disable:function-name

import { DECORATOR_REDUX_ACTION_LISTENER, GenericMethodDecorator } from './Types';
import 'reflect-metadata';
import { createObjectProperties, extractObjectProperties, ComponentProps } from './helpers/objectProperties';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include actions on state machine
 */
export function ActionListener(className: string, methodName: string): GenericMethodDecorator<any> {
  return createObjectProperties(DECORATOR_REDUX_ACTION_LISTENER, { className, methodName });
}

export function getActionListenerProperties(ctor: any): ComponentProps | undefined {
  return extractObjectProperties(ctor, DECORATOR_REDUX_ACTION_LISTENER);;
}
