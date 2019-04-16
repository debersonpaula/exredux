import {
  GenericMethodDecorator,
  Type,
  DECORATOR_REDUX_INJECT
} from './Types';
import 'reflect-metadata';
import {
  createObjectProperties,
  extractObjectProperties,
  ComponentProps
} from './helpers/objectProperties';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include actions on state machine
 */
export const Inject = (model: Type<any>): GenericMethodDecorator<any> =>
  createObjectProperties(DECORATOR_REDUX_INJECT, { model: model.name });

export function getInjectionProperties(ctor: any): ComponentProps | undefined {
  return extractObjectProperties(ctor, DECORATOR_REDUX_INJECT);
}
