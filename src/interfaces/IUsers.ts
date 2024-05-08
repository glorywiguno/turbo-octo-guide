export enum EUserType {
  Admin = 'admin',
  Manager = 'manager'
}

export interface IUserData {
  name: string;
  type: EUserType;
}
