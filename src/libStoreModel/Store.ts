import { BehaviorSubject } from 'rxjs';
import { getModel } from './decorators/Model';
import { getInject } from './decorators/Inject';
import { getAction } from './decorators/Action';
import { getTrigger } from './decorators/Trigger';
import { IModel, Type, IConnection, IAction, IDispatchValues, ITrigger } from './base/contracts';
import { breakReferences } from './helpers/propertyListCreator';

export class Store {
  protected _models: IModel[];
  protected _actionListener = new BehaviorSubject<IDispatchValues>(null);

  constructor(models: Type<any>[]) {
    // create models
    this._models = models.map(modelCtor => {
      const model = getModel(modelCtor);
      model.instance = new modelCtor();
      model.deps = getInject(model.instance);
      const actions = getAction(model.instance).filter(
        action =>
          model.instance.hasOwnProperty(action.methodName) || typeof model.instance[action.methodName] === 'function'
      );
      model.actions = breakReferences(actions);
      model.triggers = getTrigger(model.instance);
      return model;
    });

    // resolve dependencies
    this._models.forEach(model => {
      model.deps.map(dep => {
        const depComponent = this._models.find((item, index) => {
          if (!item) {
            throw `ModelStore Error: item number=${index} in the model list is undefined`;
          }
          return item.className === dep.typeName;
        });
        if (!depComponent) {
          throw `Dependency ${dep.typeName} is injected in ${model.className} thru property ${
            dep.propertyName
          } but is not found in model store.`;
        }
        model.instance[dep.propertyName] = depComponent.instance;
      });
    });

    // create actions and triggers
    this._models.forEach(model => {
      // Action
      model.actions.forEach(action => {
        action.modelName = model.className;
        this._defineDispatcher(model, action);
      });

      // Trigger
      model.triggers.forEach(trigger => {
        trigger.modelName = model.className;
        const triggerFunction = this._defineDispatcher(model, trigger);

        const watchDispatchName = `${trigger.listenToModel.name}.${trigger.listenToMethod}`;

        // listen to subject "_actionListener"
        this._actionListener.subscribe(obj => {
          if (obj !== null) {
            // check if the name matches
            if (`${obj.action.modelName}.${obj.action.methodName}` === watchDispatchName) {
              // trigger the method
              triggerFunction();
            }
          }
        });
      });
    });
  }

  public modelByClass<T>(modelType: Type<T>): T {
    const result = this._models.find(item => item.ctor === modelType).instance;
    return result;
  }

  // tslint:disable:function-name
  private _defineDispatcher(model: IModel, action: IAction | ITrigger) {
    // keep current handler
    const stateHandler: Function = model.instance[action.methodName];
    // associate action dispatcher
    const dipatcherHandler = (...args: any) => {
      // call current handler with model
      // in this parameter
      stateHandler.call(model.instance, ...args);
      // dispatch actions with payload
      this._dispatch(action, model.instance);
    };
    model.instance[action.methodName] = dipatcherHandler;
    return dipatcherHandler;
  }

  /**
   * make injection connect between model and desired target
   * @param target Target class constructor
   * @param connection Connection object
   */
  public _connect(target: any, connection: IConnection) {
    connection.injections.forEach(item => {
      const model = this._models.find(model => model.className === item.typeName);
      if (!model) {
        throw `Injection ${item.typeName} is injected in ${target.name} but is not found in model store.`;
      }

      Object.defineProperty(target.prototype, item.propertyName, {
        get() {
          return model.instance;
        },
        enumerable: true,
        configurable: true
      });
    });

    return target;
  }

  /**
   * dispatch an action thru the listener observer
   * @param action dispatched action
   * @param payload object with dispatched payload
   */
  protected _dispatch(action: IAction, payload: Object) {
    this._actionListener.next({ action, payload });
  }
}
