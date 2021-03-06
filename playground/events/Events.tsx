import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { EventsModel } from './EventsModel';

class ModelProps {
  @Inject eventsModel: EventsModel;
}
type Props = Partial<ModelProps>;

@Connection(ModelProps)
export class Events extends React.Component<Props> {
  render() {
    const { eventsModel } = this.props;
    return (
      <div>
        Example of Trigger
        <br />
        <p>Message = {eventsModel.message}</p>
        <button onClick={eventsModel.checkAddCounter}>Manually get event</button>
      </div>
    );
  }
}
