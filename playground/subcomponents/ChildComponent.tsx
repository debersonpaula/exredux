import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { ChildModel } from './ChildModel';

class ModelProps {
  @Inject childModel?: ChildModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class ChildComponent extends React.Component<ModelProps> {
  componentDidMount() {
    this.props.childModel.getDone('DONE');
  }

  render() {
    const { childModel } = this.props;
    return (
      <div>
        {/* <button onClick={this.handleClick}>Child Promise Done</button> */}
        {childModel.isCompleted ? <div>Child From Promise model => {childModel.response}</div> : null}
        {childModel.isLoading ? <p>Child Loading...</p> : null}
      </div>
    );
  }

  // handleClick = () => {
  //   this.props.childModel.getDone('DONE');
  // };
}
