import { Currency, formatCurrency, currencyConfig } from '../lib/currency';

type FriendExpenses = {
  name: string;
  displayAmount: number;
  percentage?: number;
};

interface SummaryStatsProps {
  friendExpenses: FriendExpenses[];
  currency: Currency;
}

export function SummaryStats({ friendExpenses, currency }: SummaryStatsProps) {
  const config = currencyConfig[currency];
  const getActualAmount = (displayAmount: number) => displayAmount * config.displayMultiplier;

  const totalExpense = friendExpenses.reduce(
    (sum, m) => sum + getActualAmount(m.displayAmount),
    0
  );
  const memberCount = friendExpenses.filter((m) => m.name.trim()).length;
  const perPerson = memberCount > 0 ? totalExpense / memberCount : 0;

  return (
    <div className="grid gap-2 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:grid-cols-3">
      <div>
        <p className="text-xs font-medium text-gray-600">Total Expense</p>
        <p className="mt-1 text-lg font-bold text-gray-900">
          {formatCurrency(totalExpense, currency)}
        </p>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600">Members</p>
        <p className="mt-1 text-lg font-bold text-gray-900">{memberCount}</p>
      </div>
      {memberCount > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-600">Per Person</p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {formatCurrency(perPerson, currency)}
          </p>
        </div>
      )}
    </div>
  );
}
