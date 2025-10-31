import { FileText, ArrowRight } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ENV to ENV.EXAMPLE Converter
        </h1>
      </div>
      <p className="text-sm text-gray-600">
        Convert your environment variables to .env.example format
      </p>
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <code className="px-2 py-1 bg-gray-100 rounded">POSTGRES_DB=&apos;echatbot&apos;</code>
        <ArrowRight className="h-3 w-3" />
        <code className="px-2 py-1 bg-gray-100 rounded">POSTGRES_DB=...</code>
      </div>
    </div>
  );
}
