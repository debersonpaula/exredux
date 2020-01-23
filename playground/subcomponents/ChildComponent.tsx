import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { ChildModel } from './ChildModel';

class ModelProps {
  @Inject childModel?: ChildModel;
}

@Connection(ModelProps)
export class ChildComponent extends React.Component<ModelProps> {
  componentDidMount() {
    this.props.childModel.getDone('DONE');
  }

  render() {
    const { childModel } = this.props;
    return (
      <div>
        {childModel.isCompleted ? <div>Child From Promise model => {childModel.response}</div> : null}
        {childModel.isLoading ? <p>Child Loading...</p> : null}
      </div>
    );
  }
}
