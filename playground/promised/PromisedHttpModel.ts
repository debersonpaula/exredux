import { BaseHttpModel, http } from 'exredux';

export class PromisedHttpModel extends BaseHttpModel<any> {
  getDone() {
    this.request(http.get('https://reqres.in/api/unknown/2'));
  }

  getError() {
    this.request(http.get('https://reqres.in/api/unknown/23'));
  }

  reset() {
    this.resetState();
  }
}
