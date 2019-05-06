import * as React from 'react';
import { IListData } from '../interface/IListData';

export class ListDataComponent extends React.Component<IListData> {
  public render() {
    return (
      <div>
        <button onClick={this.add}>Add</button>
        <ul>
          {this.props.list.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  add = () => {
    this.props.add('list-item');
  };
}
