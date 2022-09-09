export interface IOrderDetailListResultModel {
  id: number;
  requestNumber: string;
  presenceTime?: string;
  isUrgent?: boolean;
  shiftTitle?: string;
  shiftId?: number;
  address?: string;
  details?: IDetails[];
  invoice?: IInvoice[];
}

export interface IDetails {
  id?: number;
  requestDescription?: string;
  statusId?: number;
  statusTitle?: string;
  problems?: IProblemList[];
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
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
export interface IInvoice {
  paymentId: number;
  serviceTypeTitle?: string;
  productName?: string;
  price?: number;
  discount?: boolean;
  settlementStatus?: boolean;
  priceAfterDiscount?: number;
  status?: string;
}
