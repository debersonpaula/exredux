import { BaseMultiplePromiseModel } from 'exredux';

// mocking promise request
const promiseResolve = (label: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(label);
    }, 1500);
  });

export class PromisedMultipleModel extends BaseMultiplePromiseModel {
  model1 = this.createModel<string>();
  model2 = this.createModel<string>();

  addMessage1(label: string) {
    this.model1.request(promiseResolve(`Model1 [${new Date().toISOString()}] - ${label}`));
  }

  addMessage2(label: string) {
    this.model2.request(promiseResolve(`Model2 [${new Date().toISOString()}] - ${label}`));
  }
}
