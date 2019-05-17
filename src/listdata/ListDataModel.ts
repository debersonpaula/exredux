import { Model, Action } from '../lib';
import { CounterModel } from '../counter/CounterModel';
import { Dependency } from '../lib/ReduxDependency';

@Model
export class ListDataModel {
  list: string[] = [];

  @Dependency(CounterModel) counterModel: CounterModel;

  @Action add(name: string) {
    this.list.push(`${name}-${this.counterModel.counter}`);
  }
}
