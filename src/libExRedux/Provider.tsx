import * as React from 'react';
import { Provider as ReactProvider } from 'react-redux';
import { ModelStore } from './ModelStore';

interface Props {
  modelStore: ModelStore;
}

export class Provider extends React.Component<Props> {
  public render() {
    return (
      <ReactProvider store={this.props.modelStore.createStore()}>
        {this.props.children}
      </ReactProvider>
    );
  }
}
