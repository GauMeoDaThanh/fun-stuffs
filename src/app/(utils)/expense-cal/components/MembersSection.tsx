import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { currencyConfig } from '../lib/currency';

type FriendExpenses = {
  name: string;
  displayAmount: number;
  percentage?: number;
};

interface MembersSectionProps {
  friendExpenses: FriendExpenses[];
  splitMethod: 'equal' | 'percentage';
  setSplitMethod: (method: 'equal' | 'percentage') => void;
  updateFriendExpense: <K extends keyof FriendExpenses>(
    index: number,
    field: K,
    value: FriendExpenses[K]
  ) => void;
  addMember: () => void;
  removeMember: (index: number) => void;
}

export function MembersSection({
  friendExpenses,
  splitMethod,
  setSplitMethod,
  updateFriendExpense,
  addMember,
  removeMember,
}: MembersSectionProps) {

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Members & Expenses</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {friendExpenses.filter((m) => m.name.trim()).length} members
          </span>
          <Select
            value={splitMethod}
            onValueChange={(value: 'equal' | 'percentage') => setSplitMethod(value)}
          >
            <SelectTrigger className="w-32 border-2 border-gray-200 bg-white font-semibold text-gray-700 hover:border-blue-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equal">Equal Split</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto border-2 border-gray-200 rounded-lg p-3 space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-lg hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
        {friendExpenses.map((friend, index) => (
          <MemberInputRow
            key={index}
            index={index}
            friend={friend}
            splitMethod={splitMethod}
            onUpdate={updateFriendExpense}
            onRemove={removeMember}
            canRemove={friendExpenses.length > 2}
          />
        ))}
      </div>

      {splitMethod === 'percentage' && (
        <div className="text-sm text-gray-600">
          Total Percentage: {friendExpenses.reduce((sum, m) => sum + (m.percentage || 0), 0)}%
        </div>
      )}

      <Button
        onClick={addMember}
        variant="outline"
        className="w-full gap-2 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
      >
        <Plus className="h-4 w-4" />
        Add Member
      </Button>
    </div>
  );
}

interface MemberInputRowProps {
  index: number;
  friend: FriendExpenses;
  splitMethod: 'equal' | 'percentage';
  onUpdate: <K extends keyof FriendExpenses>(index: number, field: K, value: FriendExpenses[K]) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

function MemberInputRow({
  index,
  friend,
  splitMethod,
  onUpdate,
  onRemove,
  canRemove,
}: MemberInputRowProps) {
  const config = currencyConfig['VND'];

  return (
    <div className="flex gap-2 items-center sm:gap-3">
      <Input
        type="text"
        placeholder="Name"
        className="flex-1 border-2 border-gray-200 focus-visible:border-blue-400"
        value={friend.name}
        onChange={(e) => onUpdate(index, 'name', e.target.value)}
      />
      <div className="relative flex-1">
        <Input
          type="number"
          placeholder="Amount"
          className={`border-2 ${
            !friend.name.trim() ? 'border-gray-100 bg-gray-50 cursor-not-allowed' : 'border-gray-200'
          } focus-visible:border-blue-400`}
          value={friend.displayAmount === 0 ? '' : friend.displayAmount}
          onChange={(e) =>
            onUpdate(index, 'displayAmount', e.target.value ? Number(e.target.value) : 0)
          }
          disabled={!friend.name.trim()}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
          {config.symbol}
        </span>
      </div>
      {splitMethod === 'percentage' && (
        <div className="relative flex-1">
          <Input
            type="number"
            placeholder="Percentage"
            className="border-2 border-gray-200 focus-visible:border-blue-400"
            value={friend.percentage || 0}
            onChange={(e) =>
              onUpdate(index, 'percentage', e.target.value ? Number(e.target.value) : 0)
            }
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
            %
          </span>
        </div>
      )}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
