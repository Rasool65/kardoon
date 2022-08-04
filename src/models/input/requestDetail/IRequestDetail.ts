import { t } from 'i18next';
import * as yup from 'yup';

export interface IRequestDetail {
  serviceTypeId?: number;
  productCategoryId?: number;
  requestDescription: string;
  audioMessage?: any;
  imageMessage?: any[];
  videoMessage?: any;
  attributes: IAttributes[];
}

export const RequestDetailModelSchema: yup.SchemaOf<IRequestDetail> = yup.object({
  serviceTypeId: yup.number(),
  productCategoryId: yup.number(),
  requestDescription: yup.string().required(t('RequestDescriptionRequired')),
  audioMessage: yup.object(),
  imageMessage: yup.array(),
  videoMessage: yup.object(),
  attributes: yup.array(),
});

export interface IAttributes {
  attributeId: number;
  attributeValue: string;
  attributeValueId: number;
}

export interface IProblemsSelectModel {
  label?: string;
  value?: number;
}
