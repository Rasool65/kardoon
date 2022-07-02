import { t } from 'i18next';
import * as yup from 'yup';

export interface IAddAddressModel {
  userName?: string;
  cityId: number;
  provinceId: IProvinceSelectModel;
  districtId: IDistrictSelectModel;
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
export const AddAddressModelSchema: yup.SchemaOf<IAddAddressModel> = yup.object({
  userName: yup.string(),
  cityId: yup.number().required(''),
  provinceId: yup
    .object({
      value: yup.number().required(t('SelectProvinceRequired')),
      label: yup.string().required(t('SelectProvinceRequired')),
    })
    .required(t('SelectProvinceRequired')),
  districtId: yup
    .object({
      value: yup.number().required(t('SelectDistrictRequired')),
      label: yup.string().required(t('SelectDistrictRequired')),
    })
    .required(t('SelectDistrictRequired')),
  zipCode: yup.string(),
  latitude: yup.number(),
  longitude: yup.number(),
  title: yup.string(),
  homeTel: yup.string(),
  address: yup.string(),
  number: yup.number(),
  unit: yup.number(),
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
