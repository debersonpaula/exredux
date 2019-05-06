import { Model, Action, Dependency } from '../lib';
import { HttpModel } from './HttpModel';

@Model
export class HttpDepModel {
  @Dependency(HttpModel) httpModel: HttpModel;

  @Action getHttpDepTest(label: string) {
    this.httpModel.getHttpTest(`Inserted from HttpDepModel = ${label}`);
  }
}
