import { AxiosResponse, AxiosError } from "axios";
import axios from 'axios';
export { axios as http };

/**
 * Class to be extended for states based on Axios Http requests
 */
export class IBaseHttpModel<Response> {
  /**
   * set to true when Promise is on going
   */
  isLoading: boolean = false;

  /**
   * set to true when Promise is done
   */
  isCompleted: boolean = false;

  /**
   * set to true when Promise is failed
   */
  isFailed: boolean = false;

  /**
   * contains the object from Axios then
   */
  response?: AxiosResponse<Response>;

  /**
   * contains the object from Axios catch
   */
  error?: AxiosError;
}
