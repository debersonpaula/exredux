import * as React from 'react';
import { Provider as ReactProvider } from 'react-redux';
import { Store } from 'redux';

interface Props {
  store: Store;
}

export class Provider extends React.Component<Props> {
  public render() {
    return (
      <ReactProvider store={this.props.store}>
        {this.props.children}
      </ReactProvider>
    );
  }
}
