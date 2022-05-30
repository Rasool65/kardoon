import { t } from 'i18next';
import * as yup from 'yup';

export interface ILoginModel {
  client_id: string;
  // 'Kardoon_Technician'
  client_secret: string;
  // 'p@ssword@123'
  grant_type: string;
  // 'password'
  username: string;
  password: string;
}
// const mobileRegExp = /^09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;
const mobileRegExp = /^09-?[0-9]{9}$/;

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  client_id: yup.string().required(),
  client_secret: yup.string().required(),
  grant_type: yup.string().required(),
  username: yup.string().required(t('MobileRequired')).matches(mobileRegExp, t('InvalidMobile')),
  password: yup.string().required(t('PasswordRequired')),
  //.min(6, t('PasswordLength6')),
});
