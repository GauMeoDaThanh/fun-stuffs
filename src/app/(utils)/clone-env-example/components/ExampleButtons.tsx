import { Button } from '@/app/_shared/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ExampleButtonsProps {
  onLoadExample: (example: string) => void;
  examples: string[];
}

export function ExampleButtons({ onLoadExample, examples }: ExampleButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {examples.map((example, index) => (
        <Button
          key={index}
          onClick={() => onLoadExample(example)}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <Sparkles className="mr-1 h-3 w-3" />
          Load Example {index + 1}
        </Button>
      ))}
    </div>
  );
}
