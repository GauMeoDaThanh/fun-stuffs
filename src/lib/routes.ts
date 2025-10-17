// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route } from 'next';

export const ROUTES = {
  HOME: '/',
  EXPENSE_CALCULATOR: '/expense-cal',
  UNIT_CONVERTER: '/unit-converter',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as const satisfies Record<string, any>;
