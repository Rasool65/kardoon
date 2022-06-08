import { t } from 'i18next';
import * as yup from 'yup';
import { mobileRegExp } from './ILoginModel';

export interface IRegisterModel {
  firstName: string;
  lastName: string;
  mobile: string;
  gender: number;
}

export const RegisterModelSchema: yup.SchemaOf<IRegisterModel> = yup.object({
  firstName: yup.string().required(t('FirstNameRequired')),
  lastName: yup.string().required(t('LastNameRequired')),
  mobile: yup.string().required(t('MobileRequired')).matches(mobileRegExp, t('InvalidMobile')),
  gender: yup.number().required(t('GenderRequired')),
  // confirmPassword: yup
  //   .string()
  //   .required(t('ConfirmPasswordRequired'))
  //   .oneOf([yup.ref(`password`), null], t('InvalidConfirmPassword')),
  // yup.string().required(t('PasswordRequired')).min(6, t('PasswordLength6')),
});
