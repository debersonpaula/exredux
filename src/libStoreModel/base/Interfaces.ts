// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
/**
 * Type for what object is instances of
 */
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
  className: string;
  /**
   * className + methodName
   */
  dispatchName: string;
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
  instance: Object;

  /**
   * List of actions
   */
  actions: IAction[];

  /**
   * List of triggers
   */
  triggers: ITrigger[];
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
export interface IStore {
  _models: IModel[];
  _connect: (target: Function, connection: IConnection) => any;
  _dispatch: (action: IAction, payload: Object) => void;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IDispatchValues {
  action: IAction;
  payload: Object;
}
