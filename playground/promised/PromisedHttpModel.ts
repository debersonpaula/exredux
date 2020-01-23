import { Action, BaseHttpModel, http } from 'exredux';

// mocking http promise request
const promiseResolve = () => http.get('https://reqres.in/api/unknown/2');

const promiseReject = () => http.get('https://reqres.in/api/unknown/23');

export class PromisedHttpModel extends BaseHttpModel<any> {
  @Action getDone() {
    this.request(promiseResolve());
  }

  @Action getError() {
    this.request(promiseReject());
  }

  @Action reset() {
    this.resetState();
  }
}
