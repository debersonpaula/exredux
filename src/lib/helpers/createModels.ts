import { Type, DECORATOR_REDUX_MODEL } from '../Types';
import 'reflect-metadata';

export function createModels(models: Type<any>[]): ReduxModelInstance[] {
  return models.map(item => {
    return {
      name: Reflect.getMetadata(DECORATOR_REDUX_MODEL, item),
      component: new item()
    };
  });
}

export class ReduxModelInstance {
  name: string;
  component: any;
}