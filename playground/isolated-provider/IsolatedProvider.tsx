import * as React from 'react';
import { IsolatedProviderApp } from './IsolatedProviderApp';

export class IsolatedProvider extends React.Component {
  render() {
    return (
      <div>
        <h3>Isolated Modules:</h3>
        <IsolatedProviderApp index={1} />
        <br />
        <IsolatedProviderApp index={2} />
        <br />
        <IsolatedProviderApp index={3} />
        <br />
        <IsolatedProviderApp index={4} />
      </div>
    );
  }
}
