import { t } from 'i18next';
import * as yup from 'yup';

export interface ILoginModel {
  client_id?: string;
  client_secret?: string;
  grant_type?: string;
  username: string;
  password: string;
}
// const mobileRegExp = /^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;
const mobileRegExp = /^09-?[0-9]{9}$/;

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  client_id: yup.string(),
  client_secret: yup.string(),
  grant_type: yup.string(),
  username: yup.string().required(t('MobileRequired')).matches(mobileRegExp, t('InvalidMobile')),
  password: yup.string().required(t('PasswordRequired')),
});
