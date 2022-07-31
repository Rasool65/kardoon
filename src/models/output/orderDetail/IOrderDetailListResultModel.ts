export interface IOrderDetailListResultModel {
  id?: number;
  requestNumber?: string;
  presenceTime?: string;
  isUrgent?: boolean;
  shiftTitle?: string;
  shiftId?: number;
  address?: string;
  requestList?: IRequestList[];
  invoice?: Iinvoice[];
}

export interface IRequestList {
  id?: number;
  requestDescription?: string;
  statusId?: number;
  statusTitle?: string;
  brandName?: string;
  model?: string;
  serial?: string;
  problemList?: IProblemList[];
  videoMessageUrl?: string;
  voiceMessageUrl?: string;
  imageUrlList?: string[];
  technicians?: ITechnicians[];
}
export interface IProblemList {
  value?: number;
  label?: string;
}
export interface ITechnicians {
  name?: string;
  mobileNumber?: string;
}
export interface Iinvoice {
  title?: string;
  price?: number;
  discount?: boolean;
  settlementStatus?: boolean;
  priceAfterDiscount?: number;
  status?: string;
}
