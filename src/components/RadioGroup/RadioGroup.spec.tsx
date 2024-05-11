import { describe, test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { RadioGroup } from "./RadioGroup.tsx"
import { IOption } from "./RadioGroup.types.ts";

const testItems: IOption[] = [
  {
    value:'opt-1',
    label: 'Option 1',
    key: 'opt-1'
  },
  {
    value:'opt-2',
    label: 'Option 2',
    key: 'opt-2'
  },
  {
    value:'opt-3',
    label: 'Option 3',
    key: 'opt-3'
  }
]

describe("RadioGroup", () => {
  test("renders radio input items", async () => {
    render(
      <RadioGroup
        options={testItems}
        optionGroupName="test"
      />
    );

    const items = await screen.findAllByRole("radio");
    expect(items).toHaveLength(testItems.length);
  });


  test("matches snapshot", async () => {
    const rendered = render(
      <RadioGroup
        options={testItems}
        optionGroupName="test"
      />
    );

    expect(rendered.asFragment).toMatchSnapshot();
  })
})
