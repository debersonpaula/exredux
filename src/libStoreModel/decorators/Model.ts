import 'reflect-metadata';
import { DECORATOR_MODEL } from '../base/consts';
import { IModel } from '../base/contracts';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Model: ClassDecorator = target => {
  const metadata: IModel = {
    className: target.name,
    deps: [],
    ctor: target,
    instance: null,
    actions: [],
    triggers: []
  };
  Reflect.defineMetadata(DECORATOR_MODEL, metadata, target);
};
// ----------------------------------------------------------------------------
// --- EXTRACTOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export function getModel(target: Function): IModel {
  return Reflect.getMetadata(DECORATOR_MODEL, target) || undefined;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
