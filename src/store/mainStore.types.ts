import { IUserData, EUserType } from "../interfaces";

export interface IMainStoreState {
  users: IUserData[];
  userTypeFilter: EUserType | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
}

export interface IMainStore extends IMainStoreState {
  setUsers: (val: IUserData[]) => void;
  setUserTypeFilter: (val: EUserType) => void;
  setIsLoading: (val: boolean) => void;
  setIsError: (val: boolean) => void;
  setErrorMessage: (val: string| undefined) => void;
}

