import * as React from 'react';
import { Connection } from 'exredux';
import { MultiProviderAppProps } from './MultiProviderAppProps';

type Props = Partial<MultiProviderAppProps>;

@Connection(MultiProviderAppProps)
export class MultiProviderApp extends React.Component<Props> {
  render() {
    const { model } = this.props;

    return (
      <div>
        <p>Content = {model.log}</p>
        <button onClick={this.handleChangeLog}>Change Log</button>
      </div>
    );
  }

  handleChangeLog = () => {
    const { model } = this.props;
    model.changeLog(`Change in ${new Date().toLocaleString('pr-BR')}`);
  };
}
