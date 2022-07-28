export interface IOrderListResultModel {
  id?: number;
  requestNumber?: string;
  presenceTime?: string;
  isUrgent?: true;
  requestDetail?: IOrderRequestDetail[];
}

export interface IOrderRequestDetail {
  id?: number;
  requestDescription?: string;
  statusId?: number;
  statusTitle?: string;
}
export enum IEStatusId {
  'bg-success',
  'bg-warning',
  'bg-danger',
  'bg-info',
  'bg-danger',
  'bg-warning',
}
