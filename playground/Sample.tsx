import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { appModels } from './AppModels';
import { Counter } from './counter/Counter';
// import { ListData } from './listdata/ListData';
// import { HttpComponent } from './http/HttpComponent';
// import { EventComponent } from './events/EventComponent';

export class Sample extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider store={appModels.createStore()}>
          <div>
            Test Application for ExRedux <hr />
            <Counter />
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
