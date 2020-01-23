import { Inject, Trigger } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

export class EventsModel {
  message: string;

  @Inject counterModel: CounterModel;

  @Trigger('add', CounterModel) checkAddCounter() {
    this.message = `Counter updated to = ${this.counterModel.counter}`;
  }
}
