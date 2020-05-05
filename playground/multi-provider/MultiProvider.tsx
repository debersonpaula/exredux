import * as React from 'react';
import { Provider } from 'exredux';
import { MultiProviderModel } from './MultiProviderModel';
import { MultiProviderApp } from './MultiProviderApp';

export class MultiProvider extends React.Component {
  state = { apps: [], count: 0 };

  render() {
    return (
      <div>
        <h3>Example of Multi Provider</h3>

        <p>
          <button onClick={this.add}>Add Container</button>
        </p>

        {this.state.apps.map((app, key) => (
          <div key={key} style={{ border: '1px solid gray' }}>
            <h4>Container {key}</h4>
            <Provider models={[MultiProviderModel]}>
              <MultiProviderApp />
            </Provider>
          </div>
        ))}
      </div>
    );
  }

  add = () => {
    const count = this.state.count + 1;
    const apps = this.state.apps;
    apps.push(count);
    this.setState({ apps, count });
  };
}
