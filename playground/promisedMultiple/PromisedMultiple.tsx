import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { PromisedMultipleModel } from './PromisedMultipleModel';

class ModelProps {
  @Inject promised?: PromisedMultipleModel;
}

@Connection(ModelProps)
export class PromisedMultiple extends React.Component<ModelProps> {
  render() {
    const { promised } = this.props;
    return (
      <div>
        <p>Multiple Promise Model</p>

        <button onClick={this.handleClick1}>Promise 1</button>
        <button onClick={this.handleClick2}>Promise 2</button>

        {promised.model1.isCompleted && <p>{promised.model1.response}</p>}
        {promised.model1.isLoading && <p>Model1 loading...</p>}

        {promised.model2.isCompleted && <p>{promised.model2.response}</p>}
        {promised.model2.isLoading && <p>Model2 loading...</p>}

        <hr />
      </div>
    );
  }

  handleClick1 = () => {
    const { promised } = this.props;
    promised.addMessage1('MODEL1: added');
  };

  handleClick2 = () => {
    const { promised } = this.props;
    promised.addMessage2('MODEL2: added');
  };
}
