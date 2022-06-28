import { t } from 'i18next';
import * as yup from 'yup';

export interface IOrderDetailFirstModel {
  brand: IBrandSelectModel;
  model: string;
  serial: string;
  requestDescription: string;
}

export const OrderDetailFirstModelSchema: yup.SchemaOf<IOrderDetailFirstModel> = yup.object({
  brand: yup
    .object({
      value: yup.number().required('SelectBrandRequired'),
      label: yup.string().required('SelectBrandRequired'),
    })
    .required('SelectBrandRequired'),
  model: yup.string().required(t('ModelRequired')),
  serial: yup.string().required(t('SerialRequired')),
  requestDescription: yup.string().required(t('RequestDescriptionRequired')),
});

export interface IBrandSelectModel {
  label: string;
  value: number;
}
// "userId": 0,
//   "presenceDate": "2022-06-28T10:28:54.915Z",
//   "presenceShift": 1,
//   "address": {
//     "refkey": 0,
//     "provinceId": 0,
//     "cityId": 0,
//     "districtId": 0,
//     "latitude": 0,
//     "longitude": 0,
//     "title": "string",
//     "homeTel": "string",
//     "address": "string",
//     "number": 0,
//     "unit": 0,
//     "anotherAddressOwnerInformation": {
//       "firstName": "string",
//       "lastName": "string",
//       "mobileNumber": "string",
//       "telNumber": "string"
//     }
//   },
//   "requestDetail": [
//     {
//       "serviceTypeId": 0,
//       "productCategoryId": 0,
//       "brandId": 0,
//       "model": "string",
//       "serial": "string",
//       "requestDescription": "string"
//     }
//   ]
