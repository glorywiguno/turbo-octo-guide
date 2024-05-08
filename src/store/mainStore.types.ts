import { IUserData, EUserType } from "../interfaces";

export interface IMainStoreState {
  users: IUserData[];
  userTypeFilter: EUserType | undefined;
  isLoading: boolean;
}

export interface IMainStore extends IMainStoreState {
  setUsers: (val: IUserData[]) => void;
  setUserTypeFilterType: (val: EUserType) => void;
  setIsLoading: (val: boolean) => void;
}

