import { IUserModel } from './../../models/output/authentication/IUserModel';
export interface IAuthenticationReducerState {
  userData?: IUserModel;
  isAuthenticate: boolean;
}
