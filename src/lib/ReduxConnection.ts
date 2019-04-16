import { ModelViewer } from './ReduxModelViewer';
import { GenericClassDecorator, Type } from './Types';
import { connect } from 'react-redux';
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
interface IReduxConnectionParams {
  /**
   * Flow object to be used as map
   */
  modelViewer?: ModelViewer;

  /**
   * Properties class
   */
  props?: any;

  models?: GenericClassDecorator<Type<any>>[];
}
// ----------------------------------------------------------------------------
// --- CONNECTOR DECORATOR ----------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorate a React Component to connect to the Redux Store
 */
// tslint:disable-next-line
export const Connection = (
  options: IReduxConnectionParams
): GenericClassDecorator<Type<any>> => {


  // create component connected to the redux store
  return (target: Type<any>) => {
    // const conn: any = connect(
    //   (data) =>
    //     Object.keys(componentStatePropsKeys).reduce((total, key) => {
    //       total[key] = componentStatePropsKeys[key](data);
    //       return total;
    //     }, {}),
    //   () => componentActionProps
    // )(target);
    return connect()(target);
  };
};
