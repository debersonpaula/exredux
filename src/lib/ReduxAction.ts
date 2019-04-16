import {
  DECORATOR_REDUX_ACTION,
  GenericMethodDecorator
} from './Types';
import 'reflect-metadata';
import { createObjectProperties, extractObjectProperties, ComponentProps } from './helpers/objectProperties';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include actions on state machine
 */
export const Action: GenericMethodDecorator<any> = createObjectProperties(DECORATOR_REDUX_ACTION);


export function getActionProperties(ctor: any): ComponentProps | undefined {
  return extractObjectProperties(ctor, DECORATOR_REDUX_ACTION);;
}