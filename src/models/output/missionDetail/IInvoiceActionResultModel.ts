export interface IInvoiceActionResultModel {
  paymentId: number;
  serviceTypeTitle?: string;
  productName?: string;
  price?: number;
  discount?: boolean;
  settlementStatus?: boolean;
  priceAfterDiscount: number;
  status?: string;
}
