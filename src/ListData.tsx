import * as React from 'react';
import { Connection, Inject } from './lib';
import { appModels } from './AppModels';
import { IListData } from './interface/IListData';
import { ListDataModel } from './ListDataModel';
import { ListDataComponent } from './ListDataComponent';

class ModelProps {
  @Inject(ListDataModel) listDataModel?: IListData;
}

@Connection({
  modelViewer: appModels,
  props: ModelProps
})
export class ListData extends React.Component<ModelProps> {
  render() {
    const { listDataModel } = this.props;
    return (
      <ListDataComponent list={listDataModel.list} add={listDataModel.add} />
    );
  }
}
