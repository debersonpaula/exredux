// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface Type<T> {
  new (...args: any[]): T;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IInject {
  /**
   * Name of Property
   */
  propertyName: string;
  /**
   * Name of Type
   */
  typeName: string;
  /**
   * Name of Target Object
   */
  targetName: string;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IAction {
  /**
   * Name of Property
   */
  methodName: string;
  /**
   * Name of Container class
   */
  modelName: string;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface ITrigger extends IAction {
  /**
   * Model Class to be listened
   */
  listenToModel: Type<any>;
  /**
   * Name of method to be listened
   */
  listenToMethod: string;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IEvent extends IAction {
  /**
   * Name of method to be listened
   */
  listenToMethod: string;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IModel {
  /**
   * Name of class
   */
  className: string;

  /**
   * Dependencies
   */
  deps: IInject[];

  /**
   * Class constructor
   */
  ctor: Function;

  /**
   * Class instance
   */
  instance: any;

  /**
   * List of actions
   */
  actions: IAction[];

  /**
   * List of triggers
   */
  triggers: ITrigger[];

  /**
   * List of events
   */
  events: IEvent[];
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IConnection {
  /**
   * Dependencies injections
   */
  injections: IInject[];
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IDispatchValues {
  action: IAction;
  payload: Object;
}
