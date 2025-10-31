'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/_shared/components/navbar';
import { Button } from '@/app/_shared/components/ui/button';
import { RotateCcw, Wand2 } from 'lucide-react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { ExampleButtons } from './components/ExampleButtons';
import { convertEnvToExample, exampleInputs } from './lib/envConverter';

export default function CloneEnvExample() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [convertedCount, setConvertedCount] = useState(0);

  // Auto-convert as user types
  useEffect(() => {
    if (input.trim()) {
      const result = convertEnvToExample(input);
      setOutput(result.output);
      setConvertedCount(result.count);
    } else {
      setOutput('');
      setConvertedCount(0);
    }
  }, [input]);

  const handleLoadExample = (example: string) => {
    setInput(example);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setConvertedCount(0);
  };

  const handleConvert = () => {
    const result = convertEnvToExample(input);
    setOutput(result.output);
    setConvertedCount(result.count);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8 space-y-6">
            <Header />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ExampleButtons 
                onLoadExample={handleLoadExample}
                examples={exampleInputs}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleConvert}
                  size="sm"
                  disabled={!input.trim()}
                >
                  <Wand2 className="mr-1.5 h-4 w-4" />
                  Convert
                </Button>
                <Button
                  onClick={handleReset}
                  size="sm"
                  variant="outline"
                  disabled={!input && !output}
                >
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InputSection value={input} onChange={setInput} />
              <OutputSection value={output} count={convertedCount} />
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">How it works:</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Automatically converts env variables as you type</li>
                <li>• Removes values and replaces them with &quot;...&quot;</li>
                <li>• Preserves comments and empty lines</li>
                <li>• Supports single quotes, double quotes, or no quotes</li>
                <li>• Perfect for creating .env.example files from your .env</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

