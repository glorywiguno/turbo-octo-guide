import { IUserData } from '../interfaces/IUsers.ts';
import { GRAPHQL_API_KEY } from '../utils/constants';
export interface IUserServiceProps {
  url: string;
}

const DEFAULT_HEADER = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}


export default class UserService {
  private url: string;

  constructor(props: IUserServiceProps) {
    this.url = props.url
  }

  public async fetchUsers(): Promise<IUserData[]> {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADER,
        'x-api-key': GRAPHQL_API_KEY
      },
      body: JSON.stringify({
        query: `
          query ListZellerCustomers {
            listZellerCustomers {
              items {
                email
                id
                name
                role
              }
            }
          }
        `
      })
    });

    const jsonRes = await res.json();

    return jsonRes.data?.listZellerCustomers?.items || [];
  }


  public async fetchUsersByRole(role: string): Promise<IUserData[]> {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADER,
        'x-api-key': GRAPHQL_API_KEY
      },
      body: JSON.stringify({
        query: `
          query ListZellerCustomers {
            listZellerCustomers {
              items {
                email
                id
                name
                role
              }
            }
          }
        `
      })
    });

    const jsonRes = await res.json();
    const users = jsonRes.data?.listZellerCustomers?.items

    if (users && Array.isArray(users)) {
      return users.filter((item: IUserData) => item.role === role);
    }

    return []
  }
}
