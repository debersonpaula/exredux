import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { IsolatedProviderModel } from './IsolatedProviderModel';

class ModelProps {
  @Inject model: IsolatedProviderModel;
}
type Props = Partial<ModelProps> & {
  index: number;
};

@Connection(ModelProps)
export class IsolatedProviderComponent extends React.Component<Props> {
  render() {
    const { model, index } = this.props;

    return (
      <div>
        Isolated Model No.{index}
        <p id="counter-result">Counter = {model.counter}</p>
        <button onClick={model.add} id="counter-add">
          Increase
        </button>
        <button onClick={model.del} id="counter-del">
          Decrease
        </button>
      </div>
    );
  }
}
