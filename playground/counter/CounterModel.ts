import { Action, Trigger } from 'exredux';

export class CounterModel {
  counter = 0;
  lastAction = '';

  @Action add() {
    this.counter += 1;
  }

  @Action del() {
    this.counter -= 1;
  }

  @Trigger('add')
  lastActionAdd() {
    this.lastAction = 'add';
  }

  @Trigger('del')
  lastActionDel() {
    this.lastAction = 'del';
  }
}
