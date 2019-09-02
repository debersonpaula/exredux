import { Model, Event, Action } from 'exredux';
import { BaseModel } from './BaseModel';

@Model
export class InheritedModelOne extends BaseModel {
  @Action
  changeMessageOnBaseOne(txt: string) {
    this.changeMessage(txt);
  }

  @Event('changeMessage')
  protected eventChangedMessage() {
    this.logs.push(`One > Added message: ${this.message}`);
  }
}
