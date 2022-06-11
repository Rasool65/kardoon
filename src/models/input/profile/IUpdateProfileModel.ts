import { t } from 'i18next';
import * as yup from 'yup';

export interface IUpdateProfileModel {
  userName?: string;
  firstName: string;
  lastName: string;
  email: string;
  isPublicEmail: boolean;
  birthDate: string;
  gender: number;
}

export const UpdateProfileModelSchema: yup.SchemaOf<IUpdateProfileModel> = yup.object({
  userName: yup.string(),
  firstName: yup.string().required(t('FirstNameRequired')),
  lastName: yup.string().required(t('LastNameRequired')),
  email: yup.string().required(t('EmailRequired')).email(t('EmailNotMatch')),
  isPublicEmail: yup.boolean().required(t('IsPublicEmailRequired')),
  birthDate: yup.string().required(t('BirthDateIsRequired')),
  gender: yup.number().required(t('GenderIsRequired')),
});
