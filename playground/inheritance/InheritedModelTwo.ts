import { Model, Event, Action } from 'exredux';
import { BaseModel } from './BaseModel';

@Model
export class InheritedModelTwo extends BaseModel {
  @Action
  changeMessageOnBaseTwo(txt: string) {
    this.changeMessage(txt);
  }

  @Event('changeMessage')
  protected eventChangedMessageOnTwo() {
    this.logs.push(`Two > Added message: ${this.message}`);
  }
}
