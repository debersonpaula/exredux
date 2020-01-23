import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { InheritedModelOne } from './InheritedModelOne';
import { BaseModel } from './BaseModel';
import { InheritedModelTwo } from './InheritedModelTwo';
import { InheritedModelContainer } from './InheritedModelContainer';

class ModelProps {
  @Inject inheritedModelOne: InheritedModelOne;
  @Inject inheritedModelTwo: InheritedModelTwo;
  @Inject inheritedModelContainer: InheritedModelContainer;
}
type Props = Partial<ModelProps>;

@Connection(ModelProps)
export class InheritedComponent extends React.Component<Props> {
  render() {
    const { inheritedModelOne, inheritedModelTwo, inheritedModelContainer } = this.props;
    return (
      <div>
        Example of Inherited Model
        {this.renderComponent('Model One', inheritedModelContainer.executeOne, inheritedModelOne)}
        {this.renderComponent('Model Two', inheritedModelContainer.executeTwo, inheritedModelTwo)}
      </div>
    );
  }

  renderComponent = (caption: string, callback: () => void, model: BaseModel) => (
    <div>
      <h3>{caption}:</h3>
      <button onClick={callback}>Add to {caption}</button>
      {model.logs.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );

  handleChangeMessageOne = () => {
    const { inheritedModelOne } = this.props;
    inheritedModelOne.changeMessageOnBaseOne(`Hello! ${new Date().toLocaleString('pr-BR')}`);
  };

  handleChangeMessageTwo = () => {
    const { inheritedModelTwo } = this.props;
    inheritedModelTwo.changeMessageOnBaseTwo(`Hello from two! ${new Date().toLocaleString('pr-BR')}`);
  };
}
