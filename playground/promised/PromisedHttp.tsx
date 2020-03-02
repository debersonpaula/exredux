import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { PromisedHttpModel } from './PromisedHttpModel';

class ModelProps {
  @Inject promisedHttpModel?: PromisedHttpModel;
}

@Connection(ModelProps)
export class PromisedHttp extends React.Component<ModelProps> {
  render() {
    const { promisedHttpModel } = this.props;
    return (
      <div>
        <button onClick={promisedHttpModel.getDone}>Http Done</button>
        <button onClick={promisedHttpModel.getError}>Http Fail</button>
        <button onClick={promisedHttpModel.reset}>ResetState</button>

        {promisedHttpModel.isCompleted ? (
          <p>From http model => {JSON.stringify(promisedHttpModel.response.data)}</p>
        ) : null}
        {promisedHttpModel.isFailed ? (
          <p>Error From http model. Error status = {promisedHttpModel.error.response.status}</p>
        ) : null}
        {promisedHttpModel.isLoading ? <p>Http Loading...</p> : null}
      </div>
    );
  }
}

