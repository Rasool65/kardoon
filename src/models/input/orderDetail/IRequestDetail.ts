import { t } from 'i18next';
import * as yup from 'yup';

export interface IRequestDetail {
  serviceTypeId?: number;
  productCategoryId?: number;
  brandId: IBrandSelectModel;
  model: string;
  serial: string;
  requestDescription: string;
  audioMessage?: any;
  imageMessage?: any;
  videoMessage?: any;
}

export const RequestDetailModelSchema: yup.SchemaOf<IRequestDetail> = yup.object({
  serviceTypeId: yup.number(),
  productCategoryId: yup.number(),
  brandId: yup
    .object({
      value: yup.number().required(t('SelectBrandRequired')),
      label: yup.string().required(t('SelectBrandRequired')),
    })
    .required(t('SelectBrandRequired')),
  model: yup.string().required(t('ModelRequired')),
  serial: yup.string().required(t('SerialRequired')),
  requestDescription: yup.string().required(t('RequestDescriptionRequired')),
  audioMessage: yup.object(),
  imageMessage: yup.object(),
  videoMessage: yup.object(),
});

export interface IBrandSelectModel {
  label: string;
  value: number;
}
