import * as React from 'react'
import './App.css'
import '@picocss/pico/css/pico.blue.css';

import { EUserType } from './interfaces';
import { RadioGroup } from './components/RadioGroup';
import { UsersList } from './components/UsersList';
import { capitalizeFirstLetter } from './utils';
import UserService from './services/Users';
import useMainStore from './store/mainStore';

const userService =  new UserService({
  url:import.meta.env['VITE_GRAPHQL_API_ENDPOINT']
});

function App() {
  const {
    users,
    userTypeFilter,
    isLoading,
    setUserTypeFilter,
    setUsers,
    setIsLoading
  } = useMainStore(state =>  state);

  // fetch data on initial load
  React.useEffect(() => {
    setIsLoading(true);
    userService.fetchUsers()
      .then(res => {
        console.log(res)
        setUsers(res);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e)
        setIsLoading(false);
      });
  }, [])

  return (
    <main className="container app-container">
      {isLoading ? (<div aria-busy="true" className="loading-placeholder"/>)
      : (
        <>
          <h2 className="sectionHeading">User Types</h2>
          <RadioGroup
            onChange={(val: EUserType) => {
              setUserTypeFilter(val);
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
          {userTypeFilter !== undefined ? (
            <>
              <h2 className="sectionHeading">{capitalizeFirstLetter(userTypeFilter as string) } Users</h2>
              <UsersList
                items={users.filter(user => user.role === userTypeFilter)}
              />
              <hr/>
            </>
          ): null}
        </>
      )}
    </main>
  )
}

export default App
