import { Inject } from 'exredux';
import { PromisedMultipleModel } from './PromisedMultipleModel';

export class PromisedMultipleProps {
  @Inject
  promised?: PromisedMultipleModel;
}
