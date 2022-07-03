export interface IAddressesResultModel {
  refkey?: number;
  provinceName?: string;
  provinceId?: number;
  cityId?: number;
  cityName?: string;
  districtId?: number;
  districtName?: string;
  latitude?: number;
  longitude?: number;
  title?: string;
  homeTel?: string;
  address?: string;
  number?: number;
  unit?: number;
  zipCode?: string;
  anotherAddressOwnerInformation?: IAnotherAddressOwnerInformation;
}

interface IAnotherAddressOwnerInformation {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  telNumber?: string;
}
