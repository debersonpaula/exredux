import { Store, createStore as reduxCreateStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
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
      this._store = reduxCreateStore(()=>{}, devToolsEnhancer({}));
    } else {
      this._store = reduxCreateStore(() => {});
    }
  }

  // tslint:disable-next-line: function-name
  _connect(target: any, connection: IConnection) {
    if (connection) {
      connection.injections.forEach(model => {
        if (!this._models.find(item => model.typeName === item.className)) {
          // tslint:disable-next-line: no-console
          console.error(
            `Property ${model.propertyName} is injected as ${
              model.typeName
            } in ${target.name} can't not be found in model store.`
          );
        }
      });

      // mapping redux state to component props
      const mapStateToProps = state =>
        connection.injections.reduce((total, model) => {
          total[model.propertyName] = state[model.typeName];
          return total;
        }, {});
      // connect to redux state
      return connect(mapStateToProps)(target);
    }
    return target;
  }

  // tslint:disable-next-line: function-name
  _dispatch(action: IAction, payload: Object) {
    this._store.dispatch<IDispatcherParams>({
      payload,
      type: `${action.modelName}.${action.methodName}`,
      modelName: action.modelName
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
