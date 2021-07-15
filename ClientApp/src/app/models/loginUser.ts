export interface LoginUser {
  id: number;
  email: string;
  roleId: number;
  logged?: boolean;
  token?: string;
  invalideLoginOrPassword?: boolean;
  emailAlreadyExists?: boolean;
}
