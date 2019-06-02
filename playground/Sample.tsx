import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { appModels } from './AppModels';
import { Counter } from './counter/Counter';
import { List } from './list/List';
import { Events } from './events/Events';
import { HttpHandler } from './http-handler/HttpHandler';

export class Sample extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider store={appModels.createStore()}>
          <div>
            Test Application for ExRedux
            <hr />
            <Counter />
            <hr />
            <List />
            <hr />
            <Events />
            <hr/>
            <HttpHandler />
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
