import { Button } from '../button';

interface ActionButtonsProps {
  onCalculateSettlements: () => void;
  onReset: () => void;
}

export function ActionButtons({ onCalculateSettlements, onReset }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onCalculateSettlements}
        className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-semibold text-sm hover:from-blue-600 hover:to-purple-700"
      >
        Calculate Settlements
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        className="flex-1 border-2 border-gray-300 font-semibold text-sm hover:bg-gray-50"
      >
        Reset
      </Button>
    </div>
  );
}
