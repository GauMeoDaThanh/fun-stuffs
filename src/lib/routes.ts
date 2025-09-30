import { Route } from 'next';

export const ROUTES = {
  HOME: '/',
  EXPENSE_CALCULATOR: '/expense-cal',
} as const satisfies Record<string, Route>;
