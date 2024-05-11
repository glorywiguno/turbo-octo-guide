import { graphql, HttpResponse } from 'msw';
import { EUserType } from '../../src/interfaces';

export const fetchUsers = graphql.link(import.meta.env['VITE_GRAPHQL_API_ENDPOINT'])
  .query('ListZellerCustomers', () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    return HttpResponse.json({
      data: {
        listZellerCustomers: {
          items: [
            {
              id: "961acd9b-2461-4d76-a372-9375d16b1671",
              name: "user 1 ",
              role: EUserType.Admin,
              email: "user1@testmail.com"
            },
            {
              id: "d0f637d4-9452-4ce1-849b-94d08529df0c",
              name: "user 2",
              role: EUserType.Admin,
              email: "user2@testmail.com"
            },
            {
              id: "057c937-0dff-49b6-aab5-5b822435d5ec",
              name: "user 3",
              role: EUserType.Admin,
              email: "user3@testmail.com"
            },
            {
              id: "1c0be7ec-2f2a-4786-aea0-d6eb0eaa8fea",
              name: "user 4",
              role: EUserType.Manager,
              email: "user4@testmail.com"
            },
            {
              id: "553077e4-7a42-4e3e-8ff8-d4bbcbc0df9a",
              name: "user 5",
              role: EUserType.Manager,
              email: "user5@testmail.com"
            }
          ]
        }
      }
    })
  })

export const fetchEmptyUsers = graphql.link(import.meta.env['VITE_GRAPHQL_API_ENDPOINT'])
  .query('ListZellerCustomers', () => {
    return HttpResponse.json({
      data: {
        listZellerCustomers: {
          items: []
        }
      }
    })
  })


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUsersError = graphql.link(import.meta.env['VITE_GRAPHQL_API_ENDPOINT'])
  .query('ListZellerCustomers', () => {
    return HttpResponse.json({})
  })


export const handlers = [
  fetchUsers,
  fetchEmptyUsers,
  fetchUsersError
]
