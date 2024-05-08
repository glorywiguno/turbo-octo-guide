// import { useState } from 'react'
import './App.css'
import '@picocss/pico/css/pico.blue.css';

import { EUserType } from './interfaces';
import { RadioGroup } from './components/RadioGroup';
import { UsersList } from './components/UsersList';
import { capitalizeFirstLetter } from './utils';
import useMainStore from './store/mainStore';

const tempItems = [
  {
    name: 'John Smith',
    type: EUserType.Admin
  },
  {
    name: 'John Smith',
    type: EUserType.Admin
  },
  {
    name: 'Adam Muller',
    type: EUserType.Admin
  },
  {
    name: 'Perri Smith',
    type: EUserType.Admin
  },
  {
    name: 'John Smith',
    type: EUserType.Admin
  },
];


function App() {
  const userType = useMainStore(state => state.userTypeFilter);
  const updateUserFilter = useMainStore(state => state.setUserTypeFilterType)

  return (
    <>
      <main className="container" style={{padding: '2rem 0'}}>
        <h2 className="sectionHeading">User Types</h2>
        <RadioGroup
          onChange={(val: EUserType) => {
            updateUserFilter(val);
          }}
          optionGroupName='UserTypeSelector'
          options={[
            {
              key: 'opt-admin',
              label: 'Admin',
              value: EUserType.Admin
            },
            {
              key: 'opt-manager',
              label: 'Manager',
              value: EUserType.Manager
            },
          ]}
        />
        <hr/>
        {userType !== undefined ? (
          <>
            <h2 className="sectionHeading">{capitalizeFirstLetter(userType as string) } Users</h2>
            <UsersList
              items={tempItems}
            />
            <hr/>
          </>
        ): undefined }
      </main>
    </>
  )
}

export default App
