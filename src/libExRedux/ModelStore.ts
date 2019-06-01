import { Store, createStore as reduxCreateStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { Store as BaseStore, IConnection, IAction } from '../libStoreModel';
import { IModelStoreParams } from './IModelStoreParams';
// ----------------------------------------------------------------------------
// --- COMPONENT --------------------------------------------------------------
// ----------------------------------------------------------------------------
export class ModelStore extends BaseStore {
  private options: IModelStoreParams;
  private _store: Store;

  constructor(param: IModelStoreParams) {
    super(param.models);

    this.options = param;
    // -----------------------------------------------------
    // create basic store
    if (param.devExtension) {
      this._store = reduxCreateStore(() => {},
      window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
    } else {
      this._store = reduxCreateStore(() => {});
    }
  }

  // tslint:disable-next-line: function-name
  _connect(target: any, connection: IConnection) {
    if (connection) {
      // mapping redux state to component props
      const mapStateToProps = state =>
        connection.injections.reduce((total, model) => {
          total[model.propertyName] = state[model.typeName];
          return total;
        }, {});

      // // create component connected to the redux store
      // const connectedComponent = connect(mapStateToProps)(target);

      // console.log('connectedComponent', connectedComponent);

      return connect(mapStateToProps)(target);;
    }
    return target;
  }

  // tslint:disable-next-line: function-name
  _dispatch(action: IAction, payload: Object) {
    this._store.dispatch<IDispatcherParams>({
      payload,
      type: action.dispatchName,
      modelName: action.className
    });
    super._dispatch(action, payload);
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
    this._models.forEach(model => {
      // extract name from state constructor
      const stateName = model.className;
      // create reducer evaluation
      reducers[stateName] = (
        currentState = Object.assign({}, model.instance),
        action: IDispatcherParams
      ) => {
        if (action.modelName === model.className) {
          return { ...currentState, ...action.payload };
        }
        return currentState;
      };
    });
    return reducers;
  }
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
interface IDispatcherParams {
  type: string;
  payload: any;
  modelName: string;
}
// ----------------------------------------------------------------------------
