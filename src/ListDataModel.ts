import { Model, Action } from './lib';
import { IListData } from './interface/IListData';
import { CounterModel } from './CounterModel';
import { Dependency } from './lib/ReduxDependency';
import { ICounter } from './interface/ICounter';

@Model
export class ListDataModel implements IListData {
  list: string[] = [];

  @Dependency(CounterModel) counterModel: ICounter;

  @Action add(name: string) {
    this.list.push(name + '-' + this.counterModel.counter);
  }
}
