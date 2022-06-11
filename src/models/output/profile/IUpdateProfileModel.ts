import { t } from 'i18next';
import * as yup from 'yup';

export interface IUpdateProfileResultModel {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isPublicEmail: boolean;
  birthDate: string;
  gender: number;
}
