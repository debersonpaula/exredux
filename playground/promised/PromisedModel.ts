import { BasePromiseModel, Action } from 'exredux';

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
  messages: string[] = [];

  getDone(label: string) {
    this.request(promiseResolve(label));
  }

  getError(label: string) {
    this.request(promiseReject(label));
  }

  getCustom = () => {
    this.request(promiseResolve('TESTING CUSTOM'), {
      finished: () => this.changeMessage('FINISHED'),
      loading: () => this.changeMessage('LOADING'),
      completed: res => this.changeMessage(`COMPLETED, RESPONDE = ${res}`),
    });
  };

  reset() {
    this.resetState();
  }

  @Action changeMessage(message: string) {
    this.messages.push(message);
  }
}
