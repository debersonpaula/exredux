import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';
import { EventsModel } from './events/EventsModel';
import { HttpHandlerModel } from './http-handler/HttphandlerModel';
import { HttpHandlerModel2 } from './http-handler/HttpHandlerModel2';

export const appModels = new ModelStore({
  devExtension: true,
  models: [CounterModel, ListModel, EventsModel, HttpHandlerModel, HttpHandlerModel2]
});
