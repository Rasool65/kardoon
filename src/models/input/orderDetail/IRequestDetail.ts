import { t } from 'i18next';
import * as yup from 'yup';

export interface IRequestDetail {
  audioUrl?: string;
  serviceTypeId?: number;
  productCategoryId?: number;
  brand: IBrandSelectModel;
  model: string;
  serial: string;
  requestDescription: string;
  audioMessage?: string;
  videoMessage?: string;
}

export const RequestDetailModelSchema: yup.SchemaOf<IRequestDetail> = yup.object({
  audioUrl: yup.string(),
  serviceTypeId: yup.number(),
  productCategoryId: yup.number(),
  brand: yup
    .object({
      value: yup.number().required(t('SelectBrandRequired')),
      label: yup.string().required(t('SelectBrandRequired')),
    })
    .required(t('SelectBrandRequired')),
  model: yup.string().required(t('ModelRequired')),
  serial: yup.string().required(t('SerialRequired')),
  requestDescription: yup.string().required(t('RequestDescriptionRequired')),
  audioMessage: yup.string(),
  videoMessage: yup.string(),
});

export interface IBrandSelectModel {
  label: string;
  value: number;
}
