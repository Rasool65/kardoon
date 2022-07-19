import { IAddressesResultModel } from '@src/models/output/orderDetail/IAddressesResultModel';

export interface IAddAddressModal {
  GetAddresses?: any;
}

export interface IEditAddressModal {
  GetAddresses?: any;
  EditAddressModalVisible?: any;
  CurrentAddress: IAddressesResultModel;
}
