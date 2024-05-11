import { describe, expect, test } from 'vitest';
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

import {
  fetchEmptyUsers
} from '../tests/testhelper/handlers';
import { mswServer } from '../tests/testhelper/mockHttpServer';
// import { vi } from 'vitest'

import App from './App';



describe('App', () => {

  describe('static test', () => {
    test('initial item should be rendered', () => {
      const { getByRole } = render(<App />);
      const root = getByRole('main');
      expect(root).toBeInTheDocument()
      const adminRadio = screen.getByRole('radio', {name: 'Admin'})
      const managerRadio = screen.getByRole('radio', {name: 'Manager'})
      expect(adminRadio).toBeInTheDocument()
      expect(managerRadio).toBeInTheDocument()
    })
  });

  describe('http test', () => {
    test('should render admin users ', async () => {
      const user = userEvent.setup();
      render(<App />)
      const adminRadio = screen.getByRole('radio', {name: 'Admin'})
      await user.click(adminRadio);
      expect(adminRadio).toBeChecked()
      await waitFor(() => {
        const items = screen.getAllByRole('listitem')
        const itemsWithManager = screen.getAllByText(/(M|m)anager/)
        expect (itemsWithManager.length).toEqual(1);
        expect (itemsWithManager.length).toBeLessThan(2);
        expect(items.length).toBeGreaterThanOrEqual(2);
      })

    })

    test('should render manager users ', async () => {
      const user = userEvent.setup();
      render(<App />)
      const managerRadio = screen.getByRole('radio', {name: 'Manager'})
      await user.click(managerRadio);
      expect(managerRadio).toBeChecked()
      await waitFor(() => {
        const items = screen.getAllByRole('listitem')
        const itemsWithManager = screen.getAllByText(/(A|a)dmin/)
        expect (itemsWithManager.length).toEqual(1);
        expect (itemsWithManager.length).toBeLessThan(2);
        expect(items.length).toBeGreaterThanOrEqual(2);
      })

    })

    test('should render empty users ', async () => {
      mswServer.resetHandlers()
      mswServer.use(fetchEmptyUsers)

      const user = userEvent.setup();
      render(<App />)
      const managerRadio = screen.getByRole('radio', {name: 'Manager'})
      await user.click(managerRadio);
      expect(managerRadio).toBeChecked()
      await waitFor(() => {
        const items = screen.queryAllByRole('listitem')
        expect(items.length).toEqual(0);
      })
    })
  })
})
