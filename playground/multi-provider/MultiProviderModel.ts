import { Action } from 'exredux';

export class MultiProviderModel {
  log = '';

  @Action
  changeLog(log: string) {
    this.log = log;
  }
}
