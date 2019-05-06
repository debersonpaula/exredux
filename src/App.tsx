import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Counter } from './counter/Counter';
import { appModels } from './AppModels';
import { ListData } from './listdata/ListData';
import { HttpComponent } from './http/HttpComponent';

export class Sample extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider store={appModels.createStore()}>
          <React.Fragment>
            <Counter />
            <hr />
            <ListData />
            <hr />
            <HttpComponent />
          </React.Fragment>
        </Provider>
      </HashRouter>
    );
  }
}
