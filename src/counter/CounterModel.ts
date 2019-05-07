import { Model, Action } from 'exredux';

@Model
export class CounterModel {
  counter = 0;
  
  @Action add() {
    this.counter += 1;
  }
}
