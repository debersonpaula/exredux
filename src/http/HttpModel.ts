import { Model, Action, BaseHttpModel } from 'exredux';

// mocking http request
const httpRequest = (label: string) => Promise.resolve({ data: label });

@Model
export class HttpModel extends BaseHttpModel<string> {
  @Action getHttpTest(label: string) {
    this.request(httpRequest(label));
  }
}
