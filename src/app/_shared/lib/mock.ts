import { ROUTES } from '@/lib/routes';

// Mock data for utilities showcase
export const utilities = [
  {
    id: 'expense-cal',
    name: 'Expense Calculator',
    description: 'Split expenses fairly among friends and track who owes whom. Supports multiple currencies including VND.',
    icon: '💰',
    color: 'from-blue-500 to-purple-600',
    href: ROUTES.EXPENSE_CALCULATOR,
    features: ['Multi-currency support', 'VND multiplier (100 = 100,000 VND)', 'Settlement tracking', 'Real-time calculations'],
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units instantly. Length, weight, temperature, volume, area, speed, and energy.',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-600',
    href: ROUTES.UNIT_CONVERTER,
    features: ['7 conversion categories', 'Real-time conversion', 'Copy to clipboard', 'Responsive design'],
  },
];

// Legacy mock data (kept for backward compatibility if needed)
export const dataWithGrid = [
  {
    section: 'Finance',
    columns: 1,
    itemGroups: [
      [
        { name: 'Expense Calculator', description: 'Split expenses with friends' },
        { name: 'Tip Calculator', description: 'Calculate tips easily' },
      ],
    ],
  },
  {
    section: 'Conversion',
    columns: 1,
    itemGroups: [
      [
        { name: 'Unit Converter', description: 'Convert various units' },
        { name: 'Currency Converter', description: 'Real-time exchange rates' },
      ],
    ],
  },
];
