import { Model, ActionListener, Dependency, Action } from 'exredux';
import { CounterModel } from 'src/counter/CounterModel';

@Model
export class EventModel {
  counter = 0;

  @Dependency(CounterModel) counterModel: CounterModel;

  @ActionListener('CounterModel', 'add')
  protected getEventFromCounter() {
    this.updateInternalState(this.counterModel.counter);
  }

  @Action
  protected updateInternalState(counter: number) {
    this.counter = counter;
  }
}
