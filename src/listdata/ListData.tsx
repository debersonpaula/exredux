import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { ListDataModel } from './ListDataModel';

class ModelProps {
  @Inject(ListDataModel) listDataModel?: ListDataModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class ListData extends React.Component<ModelProps> {
  render() {
    const { listDataModel } = this.props;
    return (
      <div>
        <button onClick={this.addItem}>Add</button>
        <ul>
          {listDataModel.list.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  addItem = () => {
    this.props.listDataModel.add('list-item');
  };
}
