import { ICounter } from './interface/ICounter';
import { Model, Action } from './lib';

@Model()
export class CounterModel implements ICounter {
  counter = 0;
  
  @Action add() {
    this.counter += 1;
  }
}
