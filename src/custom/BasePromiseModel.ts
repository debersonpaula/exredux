import { Subject } from 'rxjs';
import { Action } from '../decorators/Action';
import { Trigger } from '../decorators/Trigger';

export class BasePromiseModel<T, E> {
  /**
   * set to true when Promise is done
   */
  isCompleted: boolean = false;

  /**
   * set to true when Promise is failed
   */
  isFailed: boolean = false;

  /**
   * set to true when Promise is on going
   */
  isLoading: boolean = false;

  /**
   * set to true when Promise is totally completed
   */
  isFinished: boolean = false;

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
   * trigger everytime with the finished event
   */
  finishAsync = new Subject<E>();

  @Action
  protected loading() {
    this.isLoading = true;
    this.isCompleted = false;
    this.isFailed = false;
    this.isFinished = false;
    this.response = undefined;
    this.error = undefined;
  }

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
  protected finished() {
    this.isFinished = true;
  }

  @Action
  protected resetState() {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }

  public request(requestPromise: Promise<T>, customLoader?: ILoader<T, E>) {
    const loader: ILoader<T, E> = customLoader || {
      completed: this.completed,
      failed: this.failed,
      finished: this.finished,
      loading: this.loading,
    };

    loader.loading && loader.loading();
    requestPromise
      .then(loader.completed)
      .catch(loader.failed)
      .finally(loader.finished);
  }

  @Trigger('completed')
  protected completedAsync() {
    this.responseAsync.next(this.response);
  }

  @Trigger('failed')
  protected failedAsync() {
    this.errorAsync.next(this.error);
  }

  @Trigger('finished')
  protected finishedAsync() {
    this.finishAsync.next();
  }
}

export interface ILoader<T, E> {
  loading?: () => void;
  completed?: (promiseResponse: T) => void;
  failed?: (promiseError: E) => void;
  finished?: () => void;
}
