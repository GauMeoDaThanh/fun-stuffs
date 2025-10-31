import { Textarea } from '@/app/_shared/components/ui/textarea';
import { Label } from '@/app/_shared/components/ui/label';
import { Button } from '@/app/_shared/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface OutputSectionProps {
  value: string;
  count: number;
}

export function OutputSection({ value, count }: OutputSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="env-output" className="text-sm font-semibold text-gray-700">
          Output (.env.example format)
        </Label>
        {value && (
          <Button
            onClick={handleCopy}
            size="sm"
            variant="outline"
            className="h-7"
          >
            {copied ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>
      <Textarea
        id="env-output"
        value={value}
        readOnly
        placeholder="Output will appear here..."
        className="min-h-[200px] font-mono text-sm bg-gray-50"
      />
      {count > 0 && (
        <p className="text-xs text-green-600">
          ✓ Converted {count} environment variable{count !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
