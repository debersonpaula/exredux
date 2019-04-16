import { Model, Action } from './lib';
import { IListData } from './interface/IListData';
import { CounterModel } from './CounterModel';

@Model
export class ListDataModel implements IListData {
  list: string[] = [];

  constructor(public counterModel: CounterModel) {}

  @Action
  add(name: string) {
    this.list.push(name + '-' + this.counterModel.counter);
  }
}
