import { Model, Action, Event } from 'exredux';

@Model
export class CounterModel {
  counter = 0;
  lastAction = '';

  @Action add() {
    this.counter += 1;
  }

  @Action del() {
    this.counter -= 1;
  }

  @Event('add')
  lastActionAdd() {
    this.lastAction = 'add';
  }

  @Event('del')
  lastActionDel() {
    this.lastAction = 'del';
  }
}
