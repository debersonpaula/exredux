import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { SubApp } from './SubApp';

export class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <div>
          <SubApp label="Test 1" />
        </div>
      </HashRouter>
    );
  }
}
