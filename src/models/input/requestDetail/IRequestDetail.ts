import { t } from 'i18next';
import * as yup from 'yup';

export interface IRequestDetail {
  serviceTypeId?: number;
  productCategoryId?: number;
  requestDescription: string;
  audioMessage?: any;
  imageMessage?: any[];
  videoMessage?: any;
}

export const RequestDetailModelSchema: yup.SchemaOf<IRequestDetail> = yup.object({
  serviceTypeId: yup.number(),
  productCategoryId: yup.number(),
  requestDescription: yup.string().required(t('RequestDescriptionRequired')),
  audioMessage: yup.object(),
  imageMessage: yup.array(),
  videoMessage: yup.object(),
});
