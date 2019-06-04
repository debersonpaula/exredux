import { AxiosResponse, AxiosError } from 'axios';

/**
 * Class to be extended for states based on Axios Http requests
 */
export interface IBaseHttpModel<Response> {
  /**
   * set to true when Promise is on going
   */
  isLoading: boolean;

  /**
   * set to true when Promise is done
   */
  isCompleted: boolean;

  /**
   * set to true when Promise is failed
   */
  isFailed: boolean;

  /**
   * contains the object from Axios then
   */
  response?: AxiosResponse<Response>;

  /**
   * contains the object from Axios catch
   */
  error?: AxiosError;
}
