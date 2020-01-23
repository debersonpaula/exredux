import { Subject } from 'rxjs';

import { IAction } from '../interfaces/IAction';
import { IDispatchValues } from '../interfaces/IDispatchValues';
import { IModel } from '../interfaces/IModel';
import { ITrigger } from '../interfaces/ITrigger';
import { IType } from '../interfaces/IType';

import { getAction } from '../decorators/Action';
import { getInject } from '../decorators/Inject';
import { getTrigger } from '../decorators/Trigger';

type SetStatehandler = (state: any, callback?: () => void) => void;

export class Store {
  private _models: IModel[];
  private _actionListener = new Subject<IDispatchValues>();
  private _setState: SetStatehandler;

  constructor(models: IType<any>[], setState: SetStatehandler) {
    this._setState = setState;

    this._models = models.map(modelCtor => {
      const modelName = modelCtor.name;
      const modelInstance = new modelCtor();
      const model: IModel = {
        className: modelName,
        instance: modelInstance,
        deps: getInject(modelInstance),
        actions: getAction(modelInstance).filter(
          action =>
            modelInstance.hasOwnProperty(action.methodName) || typeof modelInstance[action.methodName] === 'function'
        ),
        triggers: getTrigger(modelInstance),
      };

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
          throw `Dependency ${dep.typeName} is injected in ${model.className} thru property ${dep.propertyName} but is not found in model store.`;
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
        const watchDispatchName = `${trigger.listenToModel ? trigger.listenToModel.name : model.className}.${
          trigger.listenToMethod
        }`;

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

  public get modelState() {
    return this._models.reduce((total, current) => {
      total[current.className] = current.instance;
      return total;
    }, {});
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

      // change state
      this._setState({ [model.className]: model.instance }, () => {
        // dispatch actions with payload
        this._broadcast(action, model.instance);
      });
    };
    model.instance[action.methodName] = dipatcherHandler;
    return dipatcherHandler;
  }

  /**
   * dispatch an action thru the listener observer
   * @param action dispatched action
   * @param payload object with dispatched payload
   */
  private _broadcast(action: IAction, payload: Object) {
    this._actionListener.next({ action, payload });
  }
}
