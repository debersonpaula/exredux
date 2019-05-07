import { ModelStore } from './ReduxStore';
import { GenericClassDecorator, Type } from './Types';
import { connect } from 'react-redux';
import { getInjectionProperties } from './ReduxInject';
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
interface IReduxConnectionParams {
  /**
   * Flow object to be used as map
   */
  modelViewer: ModelStore;

  /**
   * Properties class
   */
  props?: any;
}
// ----------------------------------------------------------------------------
// --- CONNECTOR DECORATOR ----------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Decorate a React Component to connect to the Redux Store
 */
export const Connection = (
  options: IReduxConnectionParams
): GenericClassDecorator<Type<any>> => {
  // get properties from injection decorator
  const injectionProperties = getInjectionProperties(options.props);

  // create map to injecting models in component props
  const modelsToInject = !injectionProperties
    ? []
    : Object.values(injectionProperties).map((item) => {
        return {
          name: item.name,
          modelName: item.data.model
        };
      });

  // mapping redux state to component props
  const mapStateToProps = (state) =>
    modelsToInject.reduce((total, model) => {
      total[model.name] = state[model.modelName];
      return total;
    }, {});

  // create component connected to the redux store
  return (target: Type<any>) => {
    return connect(mapStateToProps)(target);
  };
};
