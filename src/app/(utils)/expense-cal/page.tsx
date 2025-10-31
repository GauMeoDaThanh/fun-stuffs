'use client';

import { useState } from 'react';
import Navbar from '@/app/_shared/components/navbar';
import { type Currency } from './lib/currency';
import { Header } from './components/Header';
import { CurrencyNote } from './components/CurrencyNote';
import { MembersSection } from './components/MembersSection';
import { SummaryStats } from './components/SummaryStats';
import { ActionButtons } from './components/ActionButtons';
import { SettlementsSection } from './components/SettlementsSection';
import { useExpenseCalculator } from './hooks/useExpenseCalculator';

export default function ExpenseCalculator() {
  const [currency, setCurrency] = useState<Currency>('VND');
  const [splitMethod, setSplitMethod] = useState<'equal' | 'percentage'>(
    'equal'
  );

  const {
    friendExpenses,
    settlements,
    updateFriendExpense,
    addMember,
    removeMember,
    calculateSettlements,
    reset,
  } = useExpenseCalculator(currency, splitMethod);

  const saveToDB = async () => {
    try {
      const response = await fetch('/api/save-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendExpenses,
          settlements,
          currency,
          splitMethod,
        }),
      });
      if (response.ok) {
        alert('Expense saved successfully!');
      } else {
        alert('Failed to save expense.');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving expense.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-4 sm:p-6">
          <div className="w-full max-w-2xl space-y-4 rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <Header currency={currency} setCurrency={setCurrency} />
            <CurrencyNote currency={currency} />

            <MembersSection
              friendExpenses={friendExpenses}
              splitMethod={splitMethod}
              setSplitMethod={setSplitMethod}
              updateFriendExpense={updateFriendExpense}
              addMember={addMember}
              removeMember={removeMember}
            />

            <SummaryStats friendExpenses={friendExpenses} currency={currency} />

            <ActionButtons
              onCalculateSettlements={calculateSettlements}
              onReset={reset}
              onSave={saveToDB}
            />

            {settlements.length > 0 && (
              <SettlementsSection
                settlements={settlements}
                currency={currency}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
