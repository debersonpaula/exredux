import * as React from 'react';
import { Connection } from './lib';
import { appModels } from './AppModels';

@Connection({
  modelViewer: appModels,
  // models
})
export class Counter extends React.Component<any> {
  componentDidMount() {
    console.log('Counter', this.props);
  }
  public render() {
    // return <CounterContainer logic={this.props.logic} />
    return <div>X</div>
  }
}

// export const CounterConnected = connect(
//   (state: any) => ({logic: state.CounterModel}),
// )(Counter);
