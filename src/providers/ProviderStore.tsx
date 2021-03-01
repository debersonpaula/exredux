import * as React from 'react';
import { ContextHandler } from './ContextHandler';
import { IType } from '../interfaces/IType';
import { Store } from './Store';

export class ProviderStore extends React.Component<IProvider, IModels> {
  state: IModels = {};
  store: Store;

  constructor(props: IProvider) {
    super(props);
    if (props.models && props.models.length) {
      this.store = new Store(props.models, this.updateStore);
      this.state = this.store.modelState;
    }
  }

  render() {
    return <ContextHandler.Provider value={this.state}>{this.props.children}</ContextHandler.Provider>;
  }

  componentWillUnmount() {
    if (this.store) {
      this.store.destroy();
    }
  }

  private updateStore = (state: any, cb: any) => {
    this.setState(state, cb);
  };
}

interface IProvider {
  models: IType<any>[];
}

interface IModels {
  [modelName: string]: object;
}
