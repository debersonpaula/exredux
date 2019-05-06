import * as React from 'react';
import { ICounter } from '../interface/ICounter';

export class CounterComponent extends React.Component<ICounter> {
  public render() {
    return (
      <div>
        Counter = {this.props.counter}
        <br />
        <button onClick={this.props.add}>Add</button>
      </div>
    );
  }
}