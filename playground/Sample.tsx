import * as React from 'react';
import { HashRouter } from 'react-router-dom';

import { appModels } from './AppModels';
import { Counter } from './counter/Counter';
import { List } from './list/List';
import { Events } from './events/Events';
import { Provider } from 'exredux';
import { Promised } from './promised/Promised';
import { MasterComponent } from './subcomponents/MasterComponent';
import { InheritedComponent } from './inheritance/InheritedComponent';

export class Sample extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider modelStore={appModels}>
          <div>
            Test Application for ExRedux
            <hr />
            <Counter />
            <hr />
            <List />
            <hr />
            <Events />
            <hr />
            <Promised />
            <hr />
            <MasterComponent />
            <hr />
            <InheritedComponent />
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
