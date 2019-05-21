import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { EventModel } from './EventModel';

class ModelProps {
  @Inject(EventModel) eventModel?: EventModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class EventComponent extends React.Component<ModelProps> {
  render() {
    const { eventModel } = this.props;
    return <div>Counter From Events = {eventModel.counter}</div>;
  }
}
