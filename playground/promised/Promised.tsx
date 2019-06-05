import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { PromisedModel } from './PromisedModel';
import { PromisedHttpModel } from './PromisedHttpModel';

class ModelProps {
  @Inject promisedModel?: PromisedModel;
  @Inject promisedHttpModel?: PromisedHttpModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class Promised extends React.Component<ModelProps> {
  render() {
    const { promisedModel, promisedHttpModel } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>Promise Done</button>
        <button onClick={this.handleClickError}>Promise Fail</button>
        <button onClick={this.handleReset}>ResetState</button>

        {promisedModel.isCompleted ? <p>From Promise model => {promisedModel.response}</p> : null}
        {promisedModel.isFailed ? <p>Error From Promise model => {promisedModel.error}</p> : null}
        {promisedModel.isLoading ? <p>Loading...</p> : null}

        <hr />

        <button onClick={this.handleClickHttp}>Http Done</button>
        <button onClick={this.handleClickErrorHttp}>Http Fail</button>
        <button onClick={this.handleResetHttp}>ResetState</button>

        {promisedHttpModel.isCompleted ? <p>From http model => {JSON.stringify(promisedHttpModel.response.data)}</p> : null}
        {promisedHttpModel.isFailed ? <p>Error From http model. Error status = {promisedHttpModel.error.response.status}</p> : null}
        {promisedHttpModel.isLoading ? <p>Loading...</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.promisedModel.getDone('test inserted from HttpComponent');
  };

  handleClickError = () => {
    this.props.promisedModel.getError('error test inserted from HttpComponent');
  };

  handleReset = () => {
    this.props.promisedModel.reset();
  };

  handleClickHttp = () => {
    this.props.promisedHttpModel.getDone();
  };

  handleClickErrorHttp = () => {
    this.props.promisedHttpModel.getError();
  };

  handleResetHttp = () => {
    this.props.promisedHttpModel.reset();
  };
}
