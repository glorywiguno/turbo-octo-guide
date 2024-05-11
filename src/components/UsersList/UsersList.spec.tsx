import { describe, test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { UsersList } from "./UsersList.tsx"
import { IUserData, EUserType } from "../../interfaces";

const testItems: IUserData[] = [
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
    role: EUserType.Admin,
    email: "user4@testmail.com"
  },
  {
    id: "553077e4-7a42-4e3e-8ff8-d4bbcbc0df9a",
    name: "user 5",
    role: EUserType.Admin,
    email: "user5@testmail.com"
  }
]

describe("UsersList", () => {
  test("renders list items", async () => {
    render(
      <UsersList
        items={testItems}
      />
    );

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(testItems.length);
  });

  test("matches snapshot", async () => {
    const rendered = render(
      <UsersList
        items={testItems}
      />
    );

    expect(rendered.asFragment).toMatchSnapshot()
  })
})
