import * as React from 'react';
import { Provider as ReactProvider } from 'react-redux';
import { Store } from 'redux';
import { ModelStore } from './ModelStore';

interface Props {
  store?: Store;
  modelStore?: ModelStore;
  suppressWarning?: boolean;
}

export class Provider extends React.Component<Props> {
  public render() {
    const { store, modelStore, children, suppressWarning } = this.props;
    if (modelStore) {
      const createdStore = modelStore.createStore();
      return <ReactProvider store={createdStore}>{children}</ReactProvider>;
    }
    if (store) {
      // tslint:disable-next-line: no-console
      console.warn('DEPRECATION WARNING: USAGE of <Provider store={modelStore.createStore()}> is DEPRECATED in the Provider and will be removed');
      // tslint:disable-next-line: no-console
      console.warn('PLEASE USE <Provider modelStore={modelStore}> INSTEAD!');

      return <ReactProvider store={store}>{children}</ReactProvider>;
    }

    // tslint:disable-next-line: no-console
    !suppressWarning && console.warn('No store provided! The children will be rendered directly without Redux Provider');
    return <React.Fragment>{children}</React.Fragment>;
  }
}
