"use client";

import { useOptimistic, useActionState, useState } from "react";

// Simulate server-side action with delay
async function saveExpense(
  prev: Expense[],
  formData: FormData
): Promise<Expense[]> {
  const total = Number(formData.get("total"));
  const friends = Number(formData.get("friends"));
  const amountPerPerson = total / friends;

  // fake delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // random failure (20% chance)
  if (Math.random() < 0.2) {
    throw new Error("Server failed");
  }

  return [
    ...prev,
    {
      id: crypto.randomUUID(),
      total,
      friends,
      amountPerPerson,
      status: "success",
    },
  ];
}

type Expense = {
  id: string;
  total: number;
  friends: number;
  amountPerPerson: number;
  status: "optimistic" | "success" | "failed";
};

export default function ExpenseSplitter() {
  const [expenses, submitAction, isPending] = useActionState<Expense[], FormData>(
    saveExpense,
    []
  );
  const [optimisticExpenses, addOptimisticExpense] = useOptimistic(
    expenses,
    (state, newExpense: Expense) => [...state, newExpense]
  );
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg w-full space-y-6 bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          💸 Expense Splitter
        </h1>

        {/* Form */}
        <form
          action={async (formData) => {
            const total = Number(formData.get("total"));
            const friends = Number(formData.get("friends"));
            const optimisticExpense: Expense = {
              id: crypto.randomUUID(),
              total,
              friends,
              amountPerPerson: total / friends,
              status: "optimistic",
            };

            // Update UI immediately
            addOptimisticExpense(optimisticExpense);

            try {
              await submitAction(formData);
              setError(null);
            } catch {
              setError("❌ Could not save expense, try again!");
              // Rollback: mark last expense as failed
              addOptimisticExpense({ ...optimisticExpense, status: "failed" });
            }
          }}
          className="space-y-4"
        >
          <div className="flex gap-2">
            <input
              type="number"
              name="total"
              placeholder="Total amount"
              className="flex-1 border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="friends"
              placeholder="Friends"
              className="w-32 border rounded-lg p-2"
              required
              min={1}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add Expense"}
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Expense List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Expenses</h2>
          <ul className="space-y-2">
            {optimisticExpenses.map((exp) => (
              <li
                key={exp.id}
                className={`p-3 rounded-lg border ${
                  exp.status === "optimistic"
                    ? "bg-yellow-50 border-yellow-300"
                    : exp.status === "failed"
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-green-50 border-green-300"
                }`}
              >
                💰 {exp.total} split between {exp.friends} →{" "}
                <span className="font-bold">
                  {exp.amountPerPerson.toFixed(2)} each
                </span>
                {exp.status === "optimistic" && " (Saving…)"}
                {exp.status === "failed" && " (Failed ❌)"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
