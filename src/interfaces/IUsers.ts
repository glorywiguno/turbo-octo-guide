export enum EUserType {
  Admin = 'ADMIN',
  Manager = 'MANAGER'
}

export interface IUserData {
  name: string;
  role: EUserType;
  id: string;
  email: string;
}
