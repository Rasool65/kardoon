import * as yup from 'yup';

export interface ILoginModel {
  userName: string;
  password: string;
}

export const LoginModelSchema: yup.SchemaOf<ILoginModel> = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});
