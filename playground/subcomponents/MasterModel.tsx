import { Action, BasePromiseModel } from 'exredux';

// mocking promise request
const promiseResolve = (label: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(label);
    }, 500);
  });

export class MasterModel extends BasePromiseModel<string, string> {
  @Action getDone(label: string) {
    this.request(promiseResolve(label));
  }
}
