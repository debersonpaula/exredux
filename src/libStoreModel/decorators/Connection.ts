import 'reflect-metadata';
import { DECORATOR_CONNECTION } from '../base/consts';
import { IConnection, Type } from '../base/contracts';
import { getInject } from './Inject';
import { Store } from '../Store';
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
  modelStore: Store;

  /**
   * Properties class
   */
  props: Type<any>;
}
