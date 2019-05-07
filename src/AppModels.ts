import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListDataModel } from './listdata/ListDataModel';
import { HttpModel } from './http/HttpModel';
import { HttpDepModel } from './http/HttpDepModel';

export const appModels = new ModelStore({
  devExtension: true,
  models: [CounterModel, ListDataModel, HttpModel, HttpDepModel]
});
