import * as React from 'react';
import { ContextHandler } from './ContextHandler';
import { IType } from '../interfaces/IType';
import { Store } from './Store';

export class ProviderStore extends React.Component<IProvider, IModels> {
  state: IModels = {};

  constructor(props: IProvider) {
    super(props);
    if (props.models && props.models.length) {
      const store = new Store(props.models, this.updateStore);
      this.state = store.modelState;
    }
  }

  render() {
    return <ContextHandler.Provider value={this.state}>{this.props.children}</ContextHandler.Provider>;
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
