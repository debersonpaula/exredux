import { Model, Inject, Trigger } from 'exredux';
import { CounterModel } from 'playground/counter/CounterModel';

@Model
export class EventsModel {
  message: string;

  @Inject counterModel: CounterModel;

  @Trigger(CounterModel, 'add') checkAddCounter() {
    this.message = `Counter updated to = ${this.counterModel.counter}`;
  }
}
