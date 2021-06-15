import * as React from 'react';
import { Connection, Inject, Provider } from 'exredux';
import { IsolatedProviderModel } from './IsolatedProviderModel';
import { IsolatedProviderComponent } from './IsolatedProviderComponent';

type Props = {
  index: number;
};

export class IsolatedProviderApp extends React.Component<Props> {
  render() {
    const { index } = this.props;

    return (
      <Provider models={[IsolatedProviderModel]}>
        <IsolatedProviderComponent index={index} />
      </Provider>
    );
  }
}
