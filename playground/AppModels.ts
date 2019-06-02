import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';
import { EventsModel } from './events/EventsModel';

export const appModels = new ModelStore({
  devExtension: true,
  models: [CounterModel, ListModel, EventsModel]
});
