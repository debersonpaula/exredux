import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Counter } from './Counter';
import { appModels } from './AppModels';

export class Sample extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider store={appModels.createStore()}>
          <React.Fragment>
            <Counter />
          </React.Fragment>
        </Provider>
      </HashRouter>
    );
  }
}
