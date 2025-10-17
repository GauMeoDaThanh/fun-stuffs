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
  const [splitMethod, setSplitMethod] = useState<'equal' | 'percentage'>('equal');

  const {
    friendExpenses,
    settlements,
    updateFriendExpense,
    addMember,
    removeMember,
    calculateSettlements,
    reset,
  } = useExpenseCalculator(currency, splitMethod);

  return (
    <>
      <Navbar />
      <main className="flex h-screen overflow-hidden flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-4">
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

            <SummaryStats
              friendExpenses={friendExpenses}
              currency={currency}
            />

            <ActionButtons
              onCalculateSettlements={calculateSettlements}
              onReset={reset}
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
