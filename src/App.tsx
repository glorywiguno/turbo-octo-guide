import './App.css'
import '@picocss/pico/css/pico.blue.css';

import { EUserType } from './interfaces';
import { RadioGroup } from './components/RadioGroup';
import { UsersList } from './components/UsersList';
import { capitalizeFirstLetter } from './utils';
import UserService from './services/Users';
import useMainStore from './store/mainStore';
import { GRAPHQL_API_ENDPOINT } from './utils/constants';

const userService =  new UserService({
  url: GRAPHQL_API_ENDPOINT
});

function App() {
  const {
    users,
    userTypeFilter,
    isLoading,
    isError,
    errorMessage,
    setUserTypeFilter,
    setIsLoading,
    setIsError,
    setErrorMessage
  } = useMainStore(state => state);

  const fetchUserByRole = async (role: EUserType) => {
    const {
      setUsers,
    } = useMainStore.getState();

    try {
      const users = await userService.fetchUsersByRole(role)
      setUsers(users);
    } catch(e) {
      setUsers([])
      throw(e);
    }
  }

  return (
    <main className="container app-container">

      <h2 className="sectionHeading">User Types</h2>
      <RadioGroup
        onChange={(val: EUserType) => {
          setUserTypeFilter(val);
          setIsLoading(true);
          fetchUserByRole(val)
          .then(() => {
            setIsLoading(false)
          })
          .catch(e => {
            console.error(e)
            setErrorMessage('There is an error in fetching user data.')
            setIsError(true),
            setIsLoading(false);
          })
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
      { userTypeFilter !== undefined
        ? isLoading && !isError
          ? (
            <>
              <hr/>
              <div aria-busy="true" className="loading-placeholder"/>
            </>
            )
          : isError ? (<p>{errorMessage}</p>)
            : (
                <>
                  <hr/>
                  <h2 className="sectionHeading">{capitalizeFirstLetter(userTypeFilter as string) } Users</h2>
                  <UsersList
                    items={users.filter(user => user.role === userTypeFilter)}
                  />
                  <hr/>
                </>
              )
        : null
      }
    </main>
  )
}

export default App
