import { Button } from '../button';

interface ActionButtonsProps {
  onCalculateSettlements: () => void;
  onReset: () => void;
  onSave: () => void;
}

export function ActionButtons({
  onCalculateSettlements,
  onReset,
  onSave,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onCalculateSettlements}
        className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-semibold hover:from-blue-600 hover:to-purple-700">
        Calculate Settlements
      </Button>
      <Button
        onClick={onSave}
        className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 py-2 text-sm font-semibold hover:from-green-600 hover:to-teal-700">
        Save to DB
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        className="flex-1 border-2 border-gray-300 text-sm font-semibold hover:bg-gray-50">
        Reset
      </Button>
    </div>
  );
}
