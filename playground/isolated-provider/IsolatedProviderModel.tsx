import { Action } from 'exredux';

export class IsolatedProviderModel {
  counter = 0;

  @Action add() {
    this.counter += 1;
  }

  @Action del() {
    this.counter -= 1;
  }
}
