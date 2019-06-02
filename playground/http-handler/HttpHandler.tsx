import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { HttpHandlerModel } from './HttphandlerModel';

class ModelProps {
  @Inject httpHandlerModel?: HttpHandlerModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class HttpHandler extends React.Component<ModelProps> {
  render() {
    const { httpHandlerModel } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>Http Done</button>
        <button onClick={this.handleClickError}>Http Fail</button>
        <button onClick={this.handleReset}>ResetState</button>

        {httpHandlerModel.isCompleted ? <p>From http model => {httpHandlerModel.response.data}</p> : null}
        {httpHandlerModel.isFailed ? <p>Error From http model => {httpHandlerModel.error.message}</p> : null}
        {httpHandlerModel.isLoading ? <p>Loading...</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.httpHandlerModel.getHttpTest('test inserted from HttpComponent');
  }

  handleClickError = () => {
    this.props.httpHandlerModel.getHttpTestError('error test inserted from HttpComponent');
  }

  handleReset = () =>{
    this.props.httpHandlerModel.reset();
  }
}
