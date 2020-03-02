import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { EventsModel } from './events/EventsModel';
import { ListModel } from './list/ListModel';
import { PromisedModel } from './promised/PromisedModel';
import { PromisedHttpModel } from './promised/PromisedHttpModel';
import { MasterModel } from './subcomponents/MasterModel';
import { ChildModel } from './subcomponents/ChildModel';
import { InheritedModelContainer } from './inheritance/InheritedModelContainer';
import { InheritedModelOne } from './inheritance/InheritedModelOne';
import { InheritedModelTwo } from './inheritance/InheritedModelTwo';
import { Counter } from './counter/Counter';
import { Events } from './events/Events';
import { List } from './list/List';
import { Promised } from './promised/Promised';
import { MasterComponent } from './subcomponents/MasterComponent';
import { InheritedComponent } from './inheritance/InheritedComponent';

export class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Provider
          models={[
            CounterModel,
            EventsModel,
            ListModel,
            PromisedModel,
            PromisedHttpModel,
            MasterModel,
            ChildModel,
            InheritedModelContainer,
            InheritedModelOne,
            InheritedModelTwo,
          ]}
        >
          <div>
            <hr />
            <h2>Test Application for ExRedux - App {this.props.label}</h2>
            <hr />
            <Counter />
            <hr />
            <Events />
            <hr />
            <List />
            <hr />
            <Promised />
            <hr />
            <MasterComponent />
            <hr />
            <InheritedComponent />
            {this.props.children}
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
