import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { CounterModel } from './CounterModel';

class ModelProps {
  @Inject(CounterModel) counterModel?: CounterModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class Counter extends React.Component<ModelProps> {
  render() {
    const { counterModel } = this.props;
    return (
      <div>
        Counter = {counterModel.counter}
        <br />
        <button onClick={counterModel.add}>Add</button>
      </div>
    );
  }
}
