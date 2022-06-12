export interface ILoginResultModel {
  accessTokenInfo: IAuthResultModel;
  user: IUserModel;
}

export interface IAuthResultModel {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface IProfileUser {
  email: string;
  gender: number;
  genderName: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  isPublicEmail: boolean;
  residenceCityId?: number;
  addresses?: string[];
}
export interface IUserModel {
  userName: string;
  profile: IProfileUser;
  roles: string[];
}
