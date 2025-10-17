import { Currency, formatCurrency } from '../lib/currency';

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

interface SettlementsSectionProps {
  settlements: Settlement[];
  currency: Currency;
}

export function SettlementsSection({ settlements, currency }: SettlementsSectionProps) {
  return (
    <div className="space-y-2 border-t border-gray-200 pt-3 max-h-48 overflow-y-auto">
      <h2 className="text-base font-semibold text-gray-900">Settlement Details</h2>
      <div className="space-y-2">
        {settlements.map((settlement, index) => (
          <SettlementRow key={index} settlement={settlement} currency={currency} />
        ))}
      </div>
    </div>
  );
}

interface SettlementRowProps {
  settlement: Settlement;
  currency: Currency;
}

function SettlementRow({ settlement, currency }: SettlementRowProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <p className="text-xs text-gray-700">
          <span className="font-bold text-blue-600">{settlement.from}</span>
          <span className="mx-2 text-gray-400">→</span>
          <span className="font-bold text-green-600">{settlement.to}</span>
        </p>
      </div>
      <div className="text-sm font-bold text-green-600">
        {formatCurrency(settlement.amount, currency)}
      </div>
    </div>
  );
}
