import { IAddressesResultModel } from '@src/models/output/requestDetail/IAddressesResultModel';

export interface IAddAddressModal {
  GetAddresses?: any;
}

export interface IEditAddressModal {
  GetAddresses?: any;
  EditAddressModalVisible?: any;
  CurrentAddress: IAddressesResultModel;
}
