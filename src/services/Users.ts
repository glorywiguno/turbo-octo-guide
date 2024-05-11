import { IUserData } from '../interfaces/IUsers.ts';

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
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          ...DEFAULT_HEADER,
          'x-api-key': import.meta.env['VITE_GRAPHQL_API_KEY']
        },
        body: JSON.stringify({
          query: `
            query ListZellerCustomers {
              listZellerCustomers {
                items {
                  email id name role
                }
              }
            }
          `
        })
      });

      const jsonRes = await res.json();
      return jsonRes.data?.listZellerCustomers?.items || [];
    } catch(e) {
      console.error(e);
      return [];
    }
  }
}
