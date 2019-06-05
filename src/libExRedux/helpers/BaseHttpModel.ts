import { AxiosResponse, AxiosError } from '../../axios';
import { Action } from '../../libStoreModel';
import { AxiosPromise } from 'axios';
import { BasePromiseModel } from './BasePromiseModel';

export class BaseHttpModel<T> extends BasePromiseModel<AxiosResponse<T>, AxiosError> {
  @Action
  protected request(httpRequest: AxiosPromise<T>) {
    this.loading();
    httpRequest.then(response => this.completed(response)).catch(error => this.failed(error));
  }
}
