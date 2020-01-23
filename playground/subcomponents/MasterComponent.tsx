import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { MasterModel } from './MasterModel';
import { ChildComponent } from './ChildComponent';

class ModelProps {
  @Inject masterModel?: MasterModel;
}

@Connection(ModelProps)
export class MasterComponent extends React.Component<ModelProps> {
  render() {
    const { masterModel } = this.props;
    return (
      <div>
        <p>Master > Child Test</p>
        <button onClick={this.handleClick}>Promise Done</button>
        {masterModel.isCompleted ? (
          <div>
            From Promise model => {masterModel.response}
            <br /> <ChildComponent />
          </div>
        ) : null}
        {masterModel.isLoading ? <p>Loading...</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.masterModel.getDone('DONE');
  };
}
