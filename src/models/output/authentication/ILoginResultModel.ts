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
  residenceCityName?: string;
  nationalCode?: string;
  addresses?: string[];
  intrductionInfo: IIntrductionInfo;
}

export interface IIntrductionInfo {
  refkey: number;
  introMethodId: number;
  introMethodTitle: string;
  introductionCode: string;
}
export interface IUserModel {
  userId: number;
  userName: string;
  profile: IProfileUser;
  roles: string[];
}
