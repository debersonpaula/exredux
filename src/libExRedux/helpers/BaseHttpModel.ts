import { IBaseHttpModel } from './IBaseHttpModel';
import { Action } from '../../libStoreModel';

export class BaseHttpModel<T = any> extends IBaseHttpModel<T> {
  constructor() {
    super();
    this.isCompleted = false;
    this.isFailed = false;
    this.isLoading = false;
    this.error = undefined;
    this.response = undefined;
  }

  @Action
  protected loading() {
    this.isLoading = true;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }

  @Action
  protected completed(promiseResponse: any) {
    this.isLoading = false;
    this.isCompleted = true;
    this.isFailed = false;
    this.response = promiseResponse;
    this.error = undefined;
  }

  @Action
  protected failed(promiseError: any) {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = true;
    this.response = undefined;
    this.error = promiseError;
  }

  @Action
  protected request(httpRequest: Promise<any>) {
    this.loading();
    httpRequest
      .then(response => this.completed(response))
      .catch(error => this.failed(error));
  }

  @Action
  protected resetState() {
    this.isLoading = false;
    this.isCompleted = false;
    this.isFailed = false;
    this.response = undefined;
    this.error = undefined;
  }
}
