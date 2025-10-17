'use client';

import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { useState } from 'react';
import { Trash2, Plus, DollarSign } from 'lucide-react';
import { currencies, type Currency, currencyConfig, formatCurrency } from './lib/currency';
import Navbar from '@/app/_shared/components/navbar';

type FriendExpenses = {
  name: string;
  displayAmount: number; // user input value
};

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

export default function ExpenseCalculator() {
  const [currency, setCurrency] = useState<Currency>('VND');
  const [friendExpenses, setFriendExpenses] = useState<FriendExpenses[]>([
    { name: '', displayAmount: 0 },
    { name: '', displayAmount: 0 },
  ]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  const config = currencyConfig[currency];

  // Convert display amount to actual amount based on currency multiplier
  const getActualAmount = (displayAmount: number) => displayAmount * config.displayMultiplier;

  const updateFriendExpense = <K extends keyof FriendExpenses>(index: number, field: K, value: FriendExpenses[K]) => {
    setFriendExpenses((prev) =>
      prev.map((expense, i) =>
        i === index ? { ...expense, [field]: field === 'displayAmount' ? Number(value) : value } : expense
      )
    );
  };

  const addMember = () => {
    setFriendExpenses((prev) => [...prev, { name: '', displayAmount: 0 }]);
  };

  const removeMember = (index: number) => {
    if (friendExpenses.length > 2) {
      setFriendExpenses((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const calculateSettlements = () => {
    // Filter members with names
    const validMembers = friendExpenses.filter((m) => m.name.trim());

    if (validMembers.length < 2) {
      alert('Please add at least 2 members with names');
      return;
    }

    // Calculate total and average using actual amounts (converted)
    const totalExpense = validMembers.reduce((sum, m) => sum + getActualAmount(m.displayAmount), 0);
    const averagePerPerson = totalExpense / validMembers.length;

    // Calculate who owes/is owed
    const balances = validMembers.map((member) => ({
      name: member.name,
      paid: getActualAmount(member.displayAmount),
      shouldPay: averagePerPerson,
      balance: getActualAmount(member.displayAmount) - averagePerPerson, // positive = owed money, negative = owes money
    }));

    // Create settlements: match debtors with creditors
    const debtors = balances.filter((b) => b.balance < 0).map((b) => ({ ...b }));
    const creditors = balances.filter((b) => b.balance > 0).map((b) => ({ ...b }));

    const newSettlements: Settlement[] = [];

    for (const debtor of debtors) {
      let remaining = Math.abs(debtor.balance);

      for (const creditor of creditors) {
        if (remaining <= 0 || creditor.balance <= 0) continue;

        const amount = Math.min(remaining, creditor.balance);
        newSettlements.push({
          from: debtor.name,
          to: creditor.name,
          amount: config.decimalPlaces === 0 ? Math.round(amount) : Math.round(amount * 100) / 100,
        });

        remaining -= amount;
        creditor.balance -= amount;
      }
    }

    setSettlements(newSettlements);
  };

  const reset = () => {
    setFriendExpenses([
      { name: '', displayAmount: 0 },
      { name: '', displayAmount: 0 },
    ]);
    setSettlements([]);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Header with Currency Selector */}
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
                  {cur} - {currencyConfig[cur].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency Note */}
        {currency === 'VND' && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-900">
              💡 Tip: Enter amounts without zeros. For example, enter <span className="font-bold">100</span> to represent{' '}
              <span className="font-bold">100,000 VND</span>
            </p>
          </div>
        )}

        {/* Members Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Members & Expenses</h2>
            <span className="text-xs font-medium text-gray-500">
              {friendExpenses.filter((m) => m.name.trim()).length} members
            </span>
          </div>

          <div className="space-y-3">
            {friendExpenses.map((friend, index) => (
              <div key={index} className="flex gap-2 items-center sm:gap-3">
                <Input
                  type="text"
                  placeholder="Name"
                  className="flex-1 border-2 border-gray-200 focus-visible:border-blue-400"
                  value={friend.name}
                  onChange={(e) => updateFriendExpense(index, 'name', e.target.value)}
                />
                <div className="relative flex-1">
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="border-2 border-gray-200 focus-visible:border-blue-400"
                    value={friend.displayAmount === 0 ? '' : friend.displayAmount}
                    onChange={(e) => updateFriendExpense(index, 'displayAmount', e.target.value ? Number(e.target.value) : 0)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                    {config.symbol}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMember(index)}
                  disabled={friendExpenses.length <= 2}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Member Button */}
          <Button onClick={addMember} variant="outline" className="w-full gap-2 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expense</p>
            <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {formatCurrency(friendExpenses.reduce((sum, m) => sum + getActualAmount(m.displayAmount), 0), currency)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Members</p>
            <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {friendExpenses.filter((m) => m.name.trim()).length}
            </p>
          </div>
          {friendExpenses.filter((m) => m.name.trim()).length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600">Per Person</p>
              <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                {formatCurrency(
                  friendExpenses.reduce((sum, m) => sum + getActualAmount(m.displayAmount), 0) /
                    Math.max(friendExpenses.filter((m) => m.name.trim()).length, 1),
                  currency
                )}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={calculateSettlements} className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-semibold hover:from-blue-600 hover:to-purple-700 sm:py-3">
            Calculate Settlements
          </Button>
          <Button onClick={reset} variant="outline" className="flex-1 border-2 border-gray-300 font-semibold hover:bg-gray-50">
            Reset
          </Button>
        </div>

        {/* Results Section */}
        {settlements.length > 0 && (
          <div className="space-y-4 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">Settlement Details</h2>
            <div className="space-y-3">
              {settlements.map((settlement, index) => (
                <div key={index} className="flex flex-col gap-2 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-blue-600">{settlement.from}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-bold text-green-600">{settlement.to}</span>
                    </p>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(settlement.amount, currency)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
