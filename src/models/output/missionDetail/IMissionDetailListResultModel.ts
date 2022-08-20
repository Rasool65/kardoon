export interface IMissionDetailResultModel {
  requestDetailId: number;
  requestNumber: string;
  serviceTypeTitle?: string;
  productTypeTitle?: string;
  productCategoryId?: number;
  presenceDateTime?: string;
  presenceShift?: string;
  address?: string;
  statusId?: number;
  statusTitle?: string;
  problemList?: IProblemList[];
  imageMessage?: string[];
  videoMessage?: string;
  audioMessage?: string;
}
export interface IProblemList {
  value?: number;
  label?: string;
}
export interface IStatus {
  value?: number;
  label?: string;
}
