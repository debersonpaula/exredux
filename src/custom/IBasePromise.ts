export interface IBasePromise<T = any, E = any> {
  /**
   * set to true when Promise is done
   */
  isCompleted: boolean;

  /**
   * set to true when Promise is failed
   */
  isFailed: boolean;

  /**
   * set to true when Promise is on going
   */
  isLoading: boolean;

  /**
   * set to true when Promise is totally completed
   */
  isFinished: boolean;

  /**
   * contains the object from Axios > then
   */
  response?: T;

  /**
   * contains the object from Axios > catch
   */
  error?: E;

  /**
   * clear all the state to the initial condition
   */
  reset: () => void;

  /**
   * make async promise to work in BasePromise logic
   */
  request: (requestPromise: Promise<T>) => void;
}
