import { Store, createStore as reduxCreateStore, combineReducers } from 'redux';
import { DECORATOR_REDUX_MODEL } from './Types';
import { ComponentProps } from './helpers/objectProperties';
import { getActionProperties } from './ReduxAction';
// ----------------------------------------------------------------------------
// --- INTERFACE --------------------------------------------------------------
// ----------------------------------------------------------------------------
interface IReduxModelViewerParams {
  /**
   * include devtools extension for browser debug
   */
  devExtension?: boolean;

  /**
   * include other reducers
   */
  include?: any;

  /**
   * import models
   */
  models?: any[];
}

class ReduxModelInstance {
  name: string;
  component: any;
}
// ----------------------------------------------------------------------------
// --- COMPONENT --------------------------------------------------------------
// ----------------------------------------------------------------------------
export class ModelViewer {
  private options: IReduxModelViewerParams;
  private _store: Store;
  private _models: ReduxModelInstance[];

  constructor(param: IReduxModelViewerParams) {
    this.options = param;
    // -----------------------------------------------------
    // create basic store
    if (param.devExtension) {
      this._store = reduxCreateStore(() => {},
      window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
    } else {
      this._store = reduxCreateStore(() => {});
    }
    // -----------------------------------------------------
    // create models
    this._models = this.options.models.map(item => {
      return {
        name: Reflect.getMetadata(DECORATOR_REDUX_MODEL, item),
        component: new item()
      };
    });
    // -----------------------------------------------------
    // generate dispatchers
    this._models.forEach((model) => {
      // get constructor
      const actionConstructor = model.component.constructor;
      // extract props name from action
      const actionProps: ComponentProps = getActionProperties(actionConstructor);
      // iterates all methods in model
      Object.values(actionProps).forEach(method => {
        // create dispatcher type name
        const actionDispatchName = `${model.name}.${method.name}`;
        // keep current handler
        const stateHandler: Function = model.component[method.name];
        // associate action dispatcher
        model.component[method.name] = (...args: any) => {
          // call current handler with model
          // in this parameter
          stateHandler.call(model.component, ...args);
          // create dispatcher params based on
          // component data object
          const dispatcherParams = {
            type: actionDispatchName,
            payload: model.component
          };
          // send 
          this._store.dispatch(dispatcherParams);
        }
      });
    });
  }

  /**
   * Returns the store for redux provider
   */
  createStore(): Store {
    // apply reducers included + flow reducers
    const reducers = combineReducers({
      ...this.options.include,
      ...this.getReducers()
    });

    // apply to store
    this._store.replaceReducer(reducers);

    return this._store;
  }

  /**
   * get current store
   */
  get store(): Store {
    return this._store;
  }

  /**
   * Get list of reducers imported by options.flowReducers
   */
  private getReducers() {
    const reducers = {};
    // generate reducers states
    this._models.forEach((model) => {
      // extract name from state constructor
      const stateName = model.name;
      // create reducer evaluation
      reducers[stateName] = (currentState = Object.assign({}, model.component), action: any) => {
        return Object.assign({}, currentState, action.payload);
      };
    });
    return reducers;
  }
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
