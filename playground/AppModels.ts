import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';
import { EventsModel } from './events/EventsModel';
import { PromisedModel } from './promised/PromisedModel';
import { PromisedHttpModel } from './promised/PromisedHttpModel';

export const appModels = new ModelStore({
  devExtension: true,
  models: [CounterModel, ListModel, EventsModel, PromisedModel, PromisedHttpModel]
});
