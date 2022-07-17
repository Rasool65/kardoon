import { t } from 'i18next';
import * as yup from 'yup';

export interface IAddAddressModel {
  userName?: string;
  countryId?: number;
  cityId?: number;
  provinceId?: number;
  regionId?: number;
  districtId?: number;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  title: string;
  homeTel: string;
  address: string;
  number: number;
  unit: number;
  anotherAddressOwnerInformation?: IAnotherAddressOwnerInformation;
}
export const AddAddressModelSchema: yup.SchemaOf<IAddAddressModel> = yup.object({
  userName: yup.string(),
  countryId: yup.number(),
  cityId: yup.number(),
  provinceId: yup.number(),
  regionId: yup.number(),
  districtId: yup.number(),
  zipCode: yup.string().required(t('ZipCodeRequired')),
  latitude: yup.number(),
  longitude: yup.number(),
  title: yup.string().required(t('TitleRequired')),
  homeTel: yup.string().required(t('HomeTelRequired')),
  address: yup.string().required(t('AddressRequired')),
  number: yup.number().required(t('NumberRequired')),
  unit: yup.number().required(t('UnitRequired')),
  anotherAddressOwnerInformation: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    mobileNumber: yup.string(),
    telNumber: yup.string(),
  }),
});
interface IAnotherAddressOwnerInformation {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  telNumber?: string;
}

interface IProvinceSelectModel {
  label: string;
  value: number;
}
interface IDistrictSelectModel {
  label: string;
  value: number;
}
interface ICountrySelectModel {
  label: string;
  value: number;
}
interface IRegionSelectModel {
  label: string;
  value: number;
}
interface ICitySelectModel {
  label: string;
  value: number;
}
