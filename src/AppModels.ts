import { ModelViewer } from './lib';
import { CounterModel } from './CounterModel';

export const appModels = new ModelViewer({
  devExtension: true,
  models: [CounterModel]
});
