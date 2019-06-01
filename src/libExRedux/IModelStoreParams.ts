import { Type } from '../libStoreModel';
// ----------------------------------------------------------------------------
// --- INTERFACE --------------------------------------------------------------
// ----------------------------------------------------------------------------
export interface IModelStoreParams {
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
  models?: Type<any>[];
}
