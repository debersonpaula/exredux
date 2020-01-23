import { AxiosResponse, AxiosError } from '../axios';
import { AxiosPromise } from 'axios';
import { BasePromiseModel } from './BasePromiseModel';
import { Action } from '../decorators/Action';

export class BaseHttpModel<T> extends BasePromiseModel<AxiosResponse<T>, AxiosError> {
  @Action
  protected request(httpRequest: AxiosPromise<T>) {
    this.loading();
    httpRequest.then(response => this.completed(response)).catch(error => this.failed(error));
  }
}
