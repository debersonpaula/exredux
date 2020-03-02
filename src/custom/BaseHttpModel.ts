import { AxiosResponse, AxiosError } from '../axios';
import { BasePromiseModel } from './BasePromiseModel';

export class BaseHttpModel<T> extends BasePromiseModel<AxiosResponse<T>, AxiosError> {}
