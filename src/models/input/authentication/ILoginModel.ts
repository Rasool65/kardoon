import { t } from 'i18next';
import * as yup from 'yup';

export interface ILoginModel {
  userName: string;
  password: string;
}

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  userName: yup.string().required(t('UserRequired')),
  password: yup.string().required(t('PasswordRequired')),
});
