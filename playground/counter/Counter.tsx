import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { CounterModel } from './CounterModel';

class ModelProps {
  @Inject counterModel: CounterModel;
}
type Props = Partial<ModelProps>;

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class Counter extends React.Component<Props> {
  render() {
    const { counterModel } = this.props;
    return (
      <div>
        Example of Model
        <p id="counter-result">Counter = {counterModel.counter}</p>
        <p id="action-result">Last Action = {counterModel.lastAction}</p>
        <button onClick={counterModel.add}>Increase</button>
        <button onClick={counterModel.del}>Decrease</button>
      </div>
    );
  }
}
