import { DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { currencies, type Currency } from '../lib/currency';

interface HeaderProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export function Header({ currency, setCurrency }: HeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-3">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Expense Splitter</h1>
          <p className="text-sm text-gray-500">Split expenses fairly with friends</p>
        </div>
      </div>
      <Select onValueChange={(value) => setCurrency(value as Currency)} defaultValue={currency}>
        <SelectTrigger className="w-32 border-2 border-gray-200 bg-white font-semibold text-gray-700 hover:border-blue-400">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {cur}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
