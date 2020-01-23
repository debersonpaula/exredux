import { IAction } from './IAction';
import { IType } from './IType';
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface ITrigger extends IAction {
  /**
   * Model Class to be listened
   */
  listenToModel: IType<any>;
  /**
   * Name of method to be listened
   */
  listenToMethod: string;
}
