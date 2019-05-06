import * as React from 'react';
import { Connection, Inject } from '../lib';
import { appModels } from '../AppModels';
import { HttpModel } from './HttpModel';
import { HttpDepModel } from './HttpDepModel';

class ModelProps {
  @Inject(HttpModel) httpModel?: HttpModel;
  @Inject(HttpDepModel) httpDepModel?: HttpDepModel;
}

@Connection({
  modelViewer: appModels,
  props: ModelProps
})
export class HttpComponent extends React.Component<ModelProps> {
  render() {
    const { httpModel } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>Get from Http</button>
        <button onClick={this.handleClickDep}>Get from HttpDep</button>
        {httpModel.isCompleted ? <p>From http model => {httpModel.response.data}</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.httpModel.getHttpTest('test inserted from HttpComponent');
  }

  handleClickDep = () => {
    this.props.httpDepModel.getHttpDepTest('test inserted from HttpComponent');
  }
}
