import { Model, Action, BaseHttpModel } from '../lib';

@Model
export class HttpModel extends BaseHttpModel<string> {
  @Action getHttpTest(label: string) {
    this.request(Promise.resolve({data: label}));
  }
}
