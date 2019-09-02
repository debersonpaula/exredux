import { Action } from 'exredux';

export class BaseModel {
  message = '';
  logs: string[] = [];

  @Action protected changeMessage(txt: string) {
    this.message = txt;
  }
}
