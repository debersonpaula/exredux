import { Action } from '../decorators/Action';
import { IBasePromise } from './IBasePromise';

export class BaseMultiplePromiseModel {
  protected createModel<T = any, E = any>() {
    const model: IBasePromise<T, E> = {
      isCompleted: undefined,
      isFailed: undefined,
      isFinished: undefined,
      isLoading: undefined,
      error: undefined,
      response: undefined,
      reset: undefined,
      request: undefined,
    };
    model.reset = () => this.reset(model);
    model.request = req => this.request(req, model);
    return model;
  }

  @Action
  private reset(model: IBasePromise) {
    model.isLoading = false;
    model.isCompleted = false;
    model.isFailed = false;
    model.isFinished = false;
    model.response = undefined;
    model.error = undefined;
  }

  @Action
  private loading(model: IBasePromise) {
    model.isLoading = true;
  }

  @Action
  private completed(model: IBasePromise, promiseResponse: any) {
    model.isLoading = false;
    model.isCompleted = true;
    model.response = promiseResponse;
  }

  @Action
  private failed(model: IBasePromise, promiseError: any) {
    model.isLoading = false;
    model.isFailed = true;
    model.error = promiseError;
  }

  @Action
  private finished(model: IBasePromise) {
    model.isFinished = true;
  }

  @Action
  private request(requestPromise: Promise<any>, model: IBasePromise) {
    this.reset(model);
    this.loading(model);
    requestPromise
      .then(res => this.completed(model, res))
      .catch(err => this.failed(model, err))
      .finally(() => this.finished(model));
  }
}
