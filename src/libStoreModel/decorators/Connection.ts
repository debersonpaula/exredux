import 'reflect-metadata';
import { DECORATOR_CONNECTION } from '../base/Consts';
import { IConnection, Type, IStore } from '../base/interfaces';
import { getInject } from './Inject';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Connection = (options: IConnectionParams): ClassDecorator => {
  const propsObject = new options.props();
  const metadata: IConnection = {
    injections: getInject(propsObject)
  };
  return target => {
    Reflect.defineMetadata(DECORATOR_CONNECTION, metadata, target);
    return options.modelStore._connect(target, metadata);
  };
};

interface IConnectionParams {
  /**
   * ModelStore object
   */
  modelStore: IStore;

  /**
   * Properties class
   */
  props: Type<any>;
}
