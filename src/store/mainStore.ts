import { create } from 'zustand';
import { IMainStore, IMainStoreState } from './mainStore.types';
import { EUserType, IUserData } from '../interfaces';

const initialState: IMainStoreState = {
  users: [],
  userTypeFilter: undefined,
  isLoading: false,
  isError: false,
  errorMessage: undefined
}

const useMainStore = create<IMainStore>()((set)=> ({
  ...initialState,
  setIsLoading: (val: boolean) => set(() => ({ isLoading: val})),
  setUsers: (val: IUserData[]) => set(() => ({ users: val})) ,
  setUserTypeFilter: (val: EUserType) => set(() => ({userTypeFilter: val})),
  setErrorMessage: (val: string | undefined) => set(() => ({errorMessage: val})),
  setIsError: (val: boolean) => set(() => ({isError: val})),
}));

export default useMainStore;
