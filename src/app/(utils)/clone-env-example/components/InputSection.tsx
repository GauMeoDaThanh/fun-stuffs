import { Textarea } from '@/app/_shared/components/ui/textarea';
import { Label } from '@/app/_shared/components/ui/label';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputSection({ value, onChange }: InputSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="env-input" className="text-sm font-semibold text-gray-700">
        Input (.env format)
      </Label>
      <Textarea
        id="env-input"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={`Enter your environment variables here...\n\nExample:\nPOSTGRES_DB='echatbot'\nPOSTGRES_USER="admin"\nAPI_KEY=secret123`}
        className="min-h-[200px] font-mono text-sm"
      />
      <p className="text-xs text-gray-500">
        Paste your .env file contents with values
      </p>
    </div>
  );
}
