import 'reflect-metadata';
import { getInject } from './Inject';
import { IType } from '../interfaces/IType';
import { ProviderConsumer } from '../providers/ProviderConsumer';
// ----------------------------------------------------------------------------
// --- DECORATOR --------------------------------------------------------------
// ----------------------------------------------------------------------------
export const Connection = (injectionClass: IType<any>): ClassDecorator => {
  const propsObject = new injectionClass();
  const injections = getInject(propsObject);

  return (target: any) => {
    // mapping redux state to component props
    const mapStateToProps = state =>
      injections.reduce((total, model) => {
        total[model.propertyName] = state[model.typeName];
        return total;
      }, {});
    // connect to redux state
    return ProviderConsumer(target, mapStateToProps) as any;
  };
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
