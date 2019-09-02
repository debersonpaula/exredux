import { Model, Inject, Action } from 'exredux';
import { InheritedModelOne } from './InheritedModelOne';
import { InheritedModelTwo } from './InheritedModelTwo';

@Model
export class InheritedModelContainer {
  @Inject private inheritedModelOne: InheritedModelOne;
  @Inject private inheritedModelTwo: InheritedModelTwo;

  @Action
  executeOne() {
    this.inheritedModelOne.changeMessageOnBaseOne(`Hello from One! ${new Date().toLocaleString('pr-BR')}`);
  }

  @Action
  executeTwo() {
    this.inheritedModelTwo.changeMessageOnBaseTwo(`Hello from Two! ${new Date().toLocaleString('pr-BR')}`);
  }
}
