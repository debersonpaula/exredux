import { BasePromiseModel } from 'exredux';

// mocking promise request
const promiseResolve = (label: string) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(label);
    }, 1500);
  });

const promiseReject = (errorMessage: string) =>
  new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(errorMessage);
    }, 1500);
  });

export class PromisedModel extends BasePromiseModel<string, string> {
  getDone(label: string) {
    this.request(promiseResolve(label));
  }

  getError(label: string) {
    this.request(promiseReject(label));
  }
}
