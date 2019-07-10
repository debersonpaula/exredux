import * as React from 'react';
import { Provider as ReactProvider } from 'react-redux';
import { Store } from 'redux';
import { ModelStore } from './ModelStore';

interface Props {
  modelStore?: ModelStore;
}

export class Provider extends React.Component<Props> {
  store: Store;

  constructor(props: Props) {
    super(props);
    if (props.modelStore) {
      this.store = props.modelStore.createStore();
    } else {
      // tslint:disable-next-line: no-console
      console.warn('No store provided! The children will be rendered directly without Redux Provider');
    }
  }

  public render() {
    const { children } = this.props;
    if (this.store) {
      return <ReactProvider store={this.store}>{children}</ReactProvider>;
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
}
