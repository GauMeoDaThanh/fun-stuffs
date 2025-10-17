import { useState } from 'react';
import { Currency, currencyConfig } from '../lib/currency';

type FriendExpenses = {
  name: string;
  displayAmount: number;
  percentage?: number;
};

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

type CurrencyConfig = {
  symbol: string;
  displayMultiplier: number;
  decimalPlaces: number;
  locale: string;
};

export function useExpenseCalculator(currency: Currency, splitMethod: 'equal' | 'percentage') {
  const [friendExpenses, setFriendExpenses] = useState<FriendExpenses[]>([
    { name: '', displayAmount: 0, percentage: 50 },
    { name: '', displayAmount: 0, percentage: 50 },
  ]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  const config = currencyConfig[currency];

  const getActualAmount = (displayAmount: number) => displayAmount * config.displayMultiplier;

  const updateFriendExpense = <K extends keyof FriendExpenses>(
    index: number,
    field: K,
    value: FriendExpenses[K]
  ) => {
    setFriendExpenses((prev) => {
      const newExpenses = [...prev];
      const currentExpense = { ...newExpenses[index] };

      if (field === 'name') {
        const trimmedValue = String(value).trim();
        const isDuplicate = prev.some(
          (expense, i) =>
            i !== index && expense.name.trim().toLowerCase() === trimmedValue.toLowerCase()
        );

        if (!isDuplicate) {
          currentExpense.name = trimmedValue;
          newExpenses[index] = currentExpense;
        }
        return newExpenses;
      }

      if (field === 'displayAmount') {
        if (currentExpense.name.trim()) {
          currentExpense.displayAmount = Number(value);
          newExpenses[index] = currentExpense;
        }
        return newExpenses;
      }

      if (field === 'percentage') {
        const numValue = Number(value);
        currentExpense.percentage = Math.max(0, Math.min(100, numValue));
        newExpenses[index] = currentExpense;
        return newExpenses;
      }

      return newExpenses;
    });
  };

  const addMember = () => {
    setFriendExpenses((prev) => {
      const currentValidMembers = prev.filter((m) => m.name.trim());
      const remainingPercentage =
        100 - currentValidMembers.reduce((sum, m) => sum + (m.percentage || 0), 0);

      return [
        ...prev,
        {
          name: '',
          displayAmount: 0,
          percentage: remainingPercentage > 0 ? remainingPercentage : 0,
        },
      ];
    });
  };

  const removeMember = (index: number) => {
    if (friendExpenses.length > 2) {
      setFriendExpenses((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const calculateSettlements = () => {
    const validMembers = friendExpenses.filter(
      (m) => m.name.trim() && m.displayAmount > 0
    );

    if (validMembers.length < 2) return;

    const uniqueNames = new Set(validMembers.map((m) => m.name.trim().toLowerCase()));
    if (uniqueNames.size !== validMembers.length) return;

    const totalExpense = validMembers.reduce(
      (sum, m) => sum + getActualAmount(m.displayAmount),
      0
    );

    if (splitMethod === 'equal') {
      const averagePerPerson = totalExpense / validMembers.length;

      const balances = validMembers.map((member) => ({
        name: member.name,
        paid: getActualAmount(member.displayAmount),
        shouldPay: averagePerPerson,
        balance: getActualAmount(member.displayAmount) - averagePerPerson,
      }));

      setSettlements(calculateTransfers(balances, config));
    } else if (splitMethod === 'percentage') {
      const totalPercentage = validMembers.reduce(
        (sum, m) => sum + (m.percentage || 0),
        0
      );

      if (Math.abs(totalPercentage - 100) > 0.01) return;

      const balances = validMembers.map((member) => ({
        name: member.name,
        paid: getActualAmount(member.displayAmount),
        shouldPay: totalExpense * ((member.percentage || 0) / 100),
        balance:
          getActualAmount(member.displayAmount) -
          totalExpense * ((member.percentage || 0) / 100),
      }));

      setSettlements(calculateTransfers(balances, config));
    }
  };

  const reset = () => {
    setFriendExpenses([
      { name: '', displayAmount: 0, percentage: 50 },
      { name: '', displayAmount: 0, percentage: 50 },
    ]);
    setSettlements([]);
  };

  return {
    friendExpenses,
    settlements,
    updateFriendExpense,
    addMember,
    removeMember,
    calculateSettlements,
    reset,
  };
}

// Helper function to calculate transfers between debtors and creditors
function calculateTransfers(
  balances: Array<{ name: string; balance: number }>,
  config: CurrencyConfig
): Settlement[] {
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
        amount:
          config.decimalPlaces === 0
            ? Math.round(amount)
            : Math.round(amount * 100) / 100,
      });

      remaining -= amount;
      creditor.balance -= amount;
    }
  }

  return newSettlements;
}
