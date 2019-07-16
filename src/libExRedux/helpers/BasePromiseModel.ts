import { Action, Event } from '../../libStoreModel';
import { Subject } from 'rxjs';

export class BasePromiseModel<T, E> {
  /**
   * set to true when Promise is on going
   */
  isCompleted: boolean = false;

  /**
   * set to true when Promise is done
   */
  isFailed: boolean = false;

  /**
   * set to true when Promise is failed
   */
  isLoading: boolean = false;

  /**
   * contains the object from Axios > then
   */
  response?: T;

  /**
   * contains the object from Axios > catch
   */
  error?: E;

  /**
   * contains the object of response
   * trigger everytime with the completed event
   */
  responseAsync = new Subject<T>();

  /**
   * contains the object of error
   * trigger everytime with the failed event
   */
  errorAsync = new Subject<E>();

  /**
   * Start the state = loading
   */
  @Action
  protected loading() {
    this.isLoading = true;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }

  /**
   * Start the state = completed
   */
  @Action
  protected completed(promiseResponse: T) {
    this.isLoading = false;
    this.isCompleted = true;
    this.isFailed = false;
    this.response = promiseResponse;
    this.error = undefined;
  }

  @Action
  protected failed(promiseError: E) {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = true;
    this.response = undefined;
    this.error = promiseError;
  }

  @Action
  protected request(httpRequest: Promise<T>) {
    this.loading();
    httpRequest.then(response => this.completed(response)).catch(error => this.failed(error));
  }

  @Action
  protected resetState() {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }

  @Event('completed')
  protected completedAsync() {
    this.responseAsync.next(this.response);
  }

  @Event('failed')
  protected failedAsync() {
    this.errorAsync.next(this.error);
  }
}
