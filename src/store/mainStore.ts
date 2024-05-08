import { create } from 'zustand';
import { IMainStore, IMainStoreState } from './mainStore.types';
import { EUserType, IUserData } from '../interfaces';

const initialState: IMainStoreState = {
  users: [],
  userTypeFilter: undefined,
  isLoading: false
}

const useMainStore = create<IMainStore>()((set)=> ({
  ...initialState,
  setIsLoading: (val: boolean) => set(() => ({ isLoading: val})),
  setUsers: (val: IUserData[]) => set(() => ({ users: val})) ,
  setUserTypeFilterType: (val: EUserType) => set(() => ({userTypeFilter: val}))
}));

export default useMainStore;
