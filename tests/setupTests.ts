import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { mswServer } from './testhelper/mockHttpServer';
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => { mswServer.listen() })

//  Close worker after all tests
afterAll(() => { mswServer.close() })

// Reset handlers after each test `important for test isolation`
afterEach(() => { mswServer.resetHandlers() })
