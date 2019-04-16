import { Model, Action } from './lib';
import { IListData } from './interface/IListData';

@Model
export class ListDataModel implements IListData {
  list: string[] = [];

  @Action
  add(name: string) {
    this.list.push(name);
  }
}
