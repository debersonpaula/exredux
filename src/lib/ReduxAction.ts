import {
  DECORATOR_REDUX_ACTION,
  GenericMethodDecorator
} from './Types';
import 'reflect-metadata';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorator to include actions on state machine
 */
export const Action: GenericMethodDecorator<any> = (target, key) => {
  // define metadata if not exists
  if (!Reflect.hasMetadata(DECORATOR_REDUX_ACTION, target)) {
    Reflect.defineMetadata(DECORATOR_REDUX_ACTION, {}, target);
  }
  // get connection props from target
  const connProps: ComponentProps = Reflect.getMetadata(
    DECORATOR_REDUX_ACTION,
    target
  );
  // define info for prop
  const props: ComponentPropInfo = {
    name: key
  };
  // copy prop to connection properties
  connProps[key] = Object.assign({}, props);
};
// --------------------------------------------------------------------
// --- SUPPORT FUNCTIONS FOR DECORATORS -------------------------------
// --------------------------------------------------------------------
export interface ComponentPropInfo {
  name: string;
}
export interface ComponentProps {
  [k: string]: ComponentPropInfo;
}
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
export function getComponentProps(ctor: {
  prototype: any;
}): ComponentProps | undefined {
  return Reflect.getMetadata(DECORATOR_REDUX_ACTION, ctor.prototype);
}