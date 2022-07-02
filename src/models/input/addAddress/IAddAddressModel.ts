export interface IAddAddressModel {
  userName: string;
  provinceId: number;
  cityId: number;
  districtId: number;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  title?: string;
  homeTel?: string;
  address?: string;
  number?: number;
  unit?: number;
  anotherAddressOwnerInformation?: IAnotherAddressOwnerInformation;
}

interface IAnotherAddressOwnerInformation {
  firstName: string;
  lastName?: string;
  mobileNumber?: string;
  telNumber?: string;
}
