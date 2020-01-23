import * as React from 'react';
import { IType } from '../interfaces/IType';
import { ContextHandler } from './ContextHandler';
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// tslint:disable-next-line: function-name
export function ProviderConsumer(
  WrappedComponent: IType<any>,
  mapStateToPropsHandler: (state: object) => { [name: string]: any }
) {
  return class extends React.Component {
    render() {
      return (
        <ContextHandler.Consumer>
          {value => <WrappedComponent {...this.props} {...mapStateToPropsHandler(value)} />}
        </ContextHandler.Consumer>
      );
    }
  };
}
