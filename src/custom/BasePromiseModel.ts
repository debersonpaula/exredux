import { Subject } from 'rxjs';
import { Action } from '../decorators/Action';
import { Trigger } from '../decorators/Trigger';
import { IBasePromise } from './IBasePromise';

export class BasePromiseModel<T, E> implements IBasePromise<T, E> {
  isCompleted = false;
  isFailed = false;
  isLoading = false;
  isFinished = false;
  response = undefined;
  error = undefined;

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
  public reset() {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }

  public request(requestPromise: Promise<T>) {
    this.loading();
    requestPromise
      .then(this.completed)
      .catch(this.failed)
      .finally(this.finished);
  }

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
