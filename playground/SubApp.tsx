import * as React from 'react';
import { Counter } from './counter/Counter';
import { CounterModel } from './counter/CounterModel';
import { Events } from './events/Events';
import { EventsModel } from './events/EventsModel';
import { List } from './list/List';
import { ListModel } from './list/ListModel';
import { Promised } from './promised/Promised';
import { PromisedHttpModel } from './promised/PromisedHttpModel';
import { PromisedModel } from './promised/PromisedModel';
import { Provider } from 'exredux';
import { MasterComponent } from './subcomponents/MasterComponent';
import { MasterModel } from './subcomponents/MasterModel';
import { ChildModel } from './subcomponents/ChildModel';
import { InheritedModelContainer } from './inheritance/InheritedModelContainer';
import { InheritedModelOne } from './inheritance/InheritedModelOne';
import { InheritedModelTwo } from './inheritance/InheritedModelTwo';
import { InheritedComponent } from './inheritance/InheritedComponent';

export class SubApp extends React.Component<IProps> {
  public render() {
    return (
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
    );
  }
}

interface IProps {
  label: string;
}
