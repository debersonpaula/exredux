import { Subject } from 'rxjs';

import { IAction } from '../interfaces/IAction';
import { IDispatchValues } from '../interfaces/IDispatchValues';
import { IModel } from '../interfaces/IModel';
import { ITrigger } from '../interfaces/ITrigger';
import { IType } from '../interfaces/IType';

import { getAction } from '../decorators/Action';
import { getInject } from '../decorators/Inject';
import { getTrigger } from '../decorators/Trigger';

import { breakReferences } from '../helpers/propertyListCreator';
import logger from '../helpers/logger';

type SetStatehandler = (state: any, callback?: () => void) => void;

export class Store {
  private _models: IModel[];
  private _actionListener = new Subject<IDispatchValues>();
  private _setState: SetStatehandler;
  private _destroyed: boolean = false;

  constructor(models: IType<any>[], setState: SetStatehandler) {
    this._setState = setState;

    this._models = models.map((modelCtor) => {
      const modelName = modelCtor.name;
      const modelInstance = new modelCtor();
      const model: IModel = {
        className: modelName,
        instance: modelInstance,
        deps: getInject(modelInstance),
        actions: breakReferences(getAction(modelInstance)),
        triggers: getTrigger(modelInstance),
      };

      return model;
    });

    // resolve dependencies
    this._models.forEach((model) => {
      model.deps.map((dep) => {
        const depComponent = this._models.find((item, index) => {
          if (!item) {
            throw new Error(`ModelStore Error: item number=${index} in the model list is undefined`);
          }
          return item.className === dep.typeName;
        });
        if (!depComponent) {
          throw new Error(
            `Dependency ${dep.typeName} is injected in ${model.className} thru property ${dep.propertyName} but is not found in model store.`,
          );
        }
        model.instance[dep.propertyName] = depComponent.instance;
      });
    });

    // create actions and triggers
    this._models.forEach((model) => {
      const modelName = model.className;
      // Action
      model.actions.forEach((action) => {
        action.modelName = modelName;
        this._defineDispatcher(model, action);
      });

      // Trigger
      model.triggers.forEach((trigger) => {
        trigger.modelName = modelName;
        const triggerFunction = this._defineDispatcher(model, trigger);
        const watchDispatchName = `${trigger.listenToModel ? trigger.listenToModel.name : model.className}.${
          trigger.listenToMethod
        }`;

        // listen to subject "_actionListener"
        this._actionListener.subscribe((obj) => {
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

  public destroy() {
    this._destroyed = true;
    this._actionListener.unsubscribe();
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
      if (this._destroyed) {
        return;
      }
      // call current handler with model
      // in this parameter
      try {
        stateHandler.call(model.instance, ...args);

        // change state
        this._setState({ [model.className]: model.instance }, () => {
          // dispatch actions with payload
          this._broadcast(action, model.instance);
        });
      } catch (error) {
        const obj = {
          routine: '_defineDispatcher',
          method: action.methodName,
          modelName: model.className,
        };
        logger.error('EXREDUX ERROR: _defineDispatcher', obj, error);
      }
    };
    model.instance[action.methodName] = dipatcherHandler;
    return dipatcherHandler;
  }

  /**
   * dispatch an action thru the listener observer
   * @param action dispatched action
   * @param payload object with dispatched payload
   */
  private _broadcast(action: IAction, payload: object) {
    this._actionListener.next({ action, payload });
  }
}
