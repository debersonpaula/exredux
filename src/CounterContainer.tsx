import * as React from 'react';
import { ICounter } from './interface/ICounter';
import { CounterComponent } from 'src/CounterComponent';

interface Props {
  logic: ICounter;
}
export class CounterContainer extends React.Component<Props> {
  public render() {
    const { logic } = this.props;
    return <CounterComponent counter={logic.counter} add={logic.add} />;
  }
}
