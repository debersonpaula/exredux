import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
// import { ListDataModel } from './listdata/ListDataModel';
// import { HttpModel } from './http/HttpModel';
// import { HttpDepModel } from './http/HttpDepModel';
// import { EventModel } from './events/EventModel';

export const appModels = new ModelStore({
  devExtension: true,
  models: [
    CounterModel
    /* CounterModel, ListDataModel, HttpModel, HttpDepModel, EventModel */
  ]
});
