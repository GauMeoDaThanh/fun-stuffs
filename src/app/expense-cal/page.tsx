'use client';

import { Input } from '@/app/expense-cal/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/expense-cal/components/ui/select';
import { useEffect, useState } from 'react';

const currencies = ['VND', 'USD'] as const;
type Currency = (typeof currencies)[number];
type FriendExpenses = {
    name: string;
    amount: number;
};

export default function ExpenseCalculator() {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [friendExpenses, setFriendExpenses] = useState<FriendExpenses[]>([
        { name: '', amount: 0 },
        { name: '', amount: 0 },
    ]);

    const updateFriendExpense = <K extends keyof FriendExpenses>(index: number, field: K, value: FriendExpenses[K]) => {
        setFriendExpenses((prev) =>
            prev.map((expense, i) =>
                i === index ? { ...expense, [field]: field === 'amount' ? Number(value) : value } : expense
            )
        );
    };

    const formatByCurrency = (amount: number, currency: Currency) => {
        return new Intl.NumberFormat('de-DE').format(amount);
    };

    useEffect(() => {
        console.log('Selected currency:', currency);
        console.log('Friend expenses:', friendExpenses);
    }, [currency, friendExpenses]);

    return (
        <main className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
            <div className="max-w-lg w-full space-y-6 bg-white shadow rounded-2xl p-6">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl">Expense Splitter 🍃</h1>
                    {/* Select currency */}
                    <Select onValueChange={(value) => setCurrency(value as Currency)} defaultValue="USD">
                        <SelectTrigger>
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

                {/* Input fields */}
                {friendExpenses.map((friend, index) => (
                    <div key={index} className="flex flex-row mb-2 gap-2">
                        <Input
                            type="text"
                            placeholder="name"
                            className="flex-3"
                            value={friend.name}
                            onChange={(e) => {
                                if (e.target.value) {
                                    updateFriendExpense(index, 'name', e.target.value);
                                }
                            }}
                        />
                        <Input
                            type="number"
                            placeholder="amount"
                            className="flex-1"
                            value={formatByCurrency(friend.amount, currency)}
                            onChange={(e) => {
                                if (e.target.value) {
                                    updateFriendExpense(index, 'amount', Number(e.target.value.replace(/\./g, '')));
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </main>

    );
}