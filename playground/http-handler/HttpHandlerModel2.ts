import { Model, Action, BaseHttpModel } from 'exredux';

// mocking http request
const httpDoneRequest = (label: string) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: label });
    }, 1500);
  });

const httpErrorRequest = (errorMessage: string) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject({ message: errorMessage });
    }, 1500);
  });

@Model
export class HttpHandlerModel2 extends BaseHttpModel<string> {
  @Action getHttpTest2(label: string) {
    this.request(httpDoneRequest(label));
  }

  @Action getHttpTestError2(label: string) {
    this.request(httpErrorRequest(label));
  }

  @Action reset() {
    this.resetState();
  }
}
