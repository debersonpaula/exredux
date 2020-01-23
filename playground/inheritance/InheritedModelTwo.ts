import { Action, Trigger } from 'exredux';
import { BaseModel } from './BaseModel';

export class InheritedModelTwo extends BaseModel {
  @Action
  changeMessageOnBaseTwo(txt: string) {
    this.changeMessage(txt);
  }

  @Trigger('changeMessage')
  protected eventChangedMessageOnTwo() {
    this.logs.push(`Two > Added message: ${this.message}`);
  }
}
