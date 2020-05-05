import { Inject } from 'exredux';
import { MultiProviderModel } from './MultiProviderModel';
export class MultiProviderAppProps {
  @Inject
  model: MultiProviderModel;
}
