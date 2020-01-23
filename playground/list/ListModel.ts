import { Action, Inject } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

export class ListModel {
  items: string[] = [];

  @Inject counterModel: CounterModel;

  @Action add() {
    this.counterModel.add();
    this.items.push(`Item ${this.items.length} : Counter = ${this.counterModel.counter}`);
  }
}
