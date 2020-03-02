import { Action, BaseHttpModel, http } from 'exredux';

export class PromisedHttpModel extends BaseHttpModel<any> {
  @Action getDone() {
    this.request(http.get('https://reqres.in/api/unknown/2'));
  }

  @Action getError() {
    this.request(http.get('https://reqres.in/api/unknown/23'));
  }

  @Action reset() {
    this.resetState();
  }
}
