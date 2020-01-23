import { Action, Trigger } from 'exredux';
import { BaseModel } from './BaseModel';

export class InheritedModelOne extends BaseModel {
  @Action
  changeMessageOnBaseOne(txt: string) {
    this.changeMessage(txt);
  }

  @Trigger('changeMessage')
  protected eventChangedMessage() {
    this.logs.push(`One > Added message: ${this.message}`);
  }
}
