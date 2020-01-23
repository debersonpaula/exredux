import { IInject } from './IInject';
import { IAction } from './IAction';
import { ITrigger } from './ITrigger';
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
}
