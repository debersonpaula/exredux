import * as React from 'react';
import { Connection } from './lib';
import { appModels } from './AppModels';
import { CounterModel } from './CounterModel';
import { ICounter } from './interface/ICounter';
import { Inject } from './lib/ReduxInject';
import { CounterComponent } from './CounterComponent';

class ModelProps {
  @Inject(CounterModel) counterModel: ICounter;
}

@Connection({
  modelViewer: appModels,
  props: ModelProps
})
export class Counter extends React.Component<ModelProps> {
  render() {
    const { counterModel } = this.props;
    return (
      <CounterComponent counter={counterModel.counter} add={counterModel.add} />
    );
  }
}
