import { ModelViewer } from './lib';
import { CounterModel } from './CounterModel';
import { ListDataModel } from './ListDataModel';

export const appModels = new ModelViewer({
  devExtension: true,
  models: [CounterModel, ListDataModel]
});
