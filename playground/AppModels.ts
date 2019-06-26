import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';
import { EventsModel } from './events/EventsModel';
import { PromisedModel } from './promised/PromisedModel';
import { PromisedHttpModel } from './promised/PromisedHttpModel';
import { MasterModel } from './subcomponents/MasterModel';
import { ChildModel } from './subcomponents/ChildModel';

export const appModels = new ModelStore({
  devExtension: true,
  models: [CounterModel, ListModel, EventsModel, PromisedModel, PromisedHttpModel, MasterModel, ChildModel]
});
