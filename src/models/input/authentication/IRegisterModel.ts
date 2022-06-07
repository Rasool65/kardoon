import { t } from 'i18next';
import * as yup from 'yup';
import { mobileRegExp } from './ILoginModel';

export interface IRegisterModel {
  username: string;
  password: string;
  confirmPassword: string;
}

export const LoginModelSchema: yup.SchemaOf<IRegisterModel> = yup.object({
  username: yup.string().required(t('MobileRequired')).matches(mobileRegExp, t('InvalidMobile')),
  password: yup.string().required(t('PasswordRequired')).min(6, t('PasswordLength6')),
  confirmPassword: yup
    .string()
    .required(t('ConfirmPasswordRequired'))
    .oneOf([yup.ref(`password`), null], t('InvalidConfirmPassword')),
});
