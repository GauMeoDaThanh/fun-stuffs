import { Currency } from '../lib/currency';

interface CurrencyNoteProps {
  currency: Currency;
}

export function CurrencyNote({ currency }: CurrencyNoteProps) {
  if (currency !== 'VND') return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
      <p className="text-xs font-medium text-blue-900">
        💡 Tip: Enter amounts without zeros. For example, enter{' '}
        <span className="font-bold">100</span> to represent{' '}
        <span className="font-bold">100,000 VND</span>
      </p>
    </div>
  );
}
