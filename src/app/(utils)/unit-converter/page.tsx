'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_shared/components/ui/select';
import { Button } from '@/app/_shared/components/ui/button';
import {
  convert,
  getCategories,
  getUnits,
  getUnitLabel,
  getUnitSymbol,
  type ConversionCategory,
  converterConfig,
} from './lib/converter';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import Navbar from '@/app/_shared/components/navbar';

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);

  const units = getUnits(category);

  // Auto-convert when from value changes
  useEffect(() => {
    if (fromValue === '' || fromValue === '-') {
      setToValue('');
    } else {
      const numValue = parseFloat(fromValue);
      if (!isNaN(numValue)) {
        const result = convert(numValue, category, fromUnit, toUnit);
        // Format result
        if (result === 0) {
          setToValue('0');
        } else if (Math.abs(result) < 0.0001 || Math.abs(result) > 1e10) {
          setToValue(result.toExponential(6));
        } else {
          setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
        }
      }
    }
  }, [fromValue, category, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const handleCopy = (value: string, isTo: boolean) => {
    if (value) {
      navigator.clipboard.writeText(value);
      if (isTo) {
        setCopiedTo(true);
        setTimeout(() => setCopiedTo(false), 2000);
      } else {
        setCopiedFrom(true);
        setTimeout(() => setCopiedFrom(false), 2000);
      }
    }
  };

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    const newUnits = getUnits(newCategory);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
    setFromValue('');
    setToValue('');
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Unit Converter</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Convert between different units instantly</p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-semibold text-gray-700">Select Category</label>
            <Select onValueChange={handleCategoryChange} value={category}>
              <SelectTrigger className="w-full border-2 border-gray-200 bg-white py-3 text-base font-semibold text-gray-700 sm:text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getCategories().map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-base">
                    {converterConfig[cat as ConversionCategory].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Section */}
          <div className="space-y-6">
            {/* From Unit */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">From</label>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="number"
                  placeholder="Enter value"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-3 text-base placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none sm:text-lg"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-full border-2 border-gray-200 bg-white px-3 py-3 font-semibold text-gray-700 sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {getUnitLabel(category, unit)} ({getUnitSymbol(category, unit)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSwap}
                variant="outline"
                size="icon"
                className="rounded-full border-2 border-gray-300 bg-white hover:bg-blue-50"
              >
                <ArrowRightLeft className="h-5 w-5 rotate-90 text-gray-600 sm:h-6 sm:w-6" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">To</label>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="text"
                  readOnly
                  placeholder="Result"
                  value={toValue}
                  className="flex-1 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-700 sm:text-lg"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-full border-2 border-gray-200 bg-white px-3 py-3 font-semibold text-gray-700 sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {getUnitLabel(category, unit)} ({getUnitSymbol(category, unit)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Copy Buttons */}
          {fromValue && toValue && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => handleCopy(fromValue, false)}
                variant="outline"
                className="flex-1 gap-2 border-2 border-gray-300 font-semibold"
              >
                {copiedFrom ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy From
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleCopy(toValue, true)}
                className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold hover:from-blue-600 hover:to-indigo-700"
              >
                {copiedTo ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Result
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Conversion Info */}
          {fromValue && toValue && (
            <div className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
              <p className="text-center text-sm font-semibold text-gray-800 sm:text-base">
                <span className="text-blue-600">{fromValue}</span> {getUnitSymbol(category, fromUnit)} ={' '}
                <span className="text-indigo-600">{toValue}</span> {getUnitSymbol(category, toUnit)}
              </p>
            </div>
          )}

          {/* Quick Reference */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="mb-4 text-sm font-bold text-gray-700 sm:text-base">Quick Reference</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {units.slice(0, 6).map((unit) => (
                <div key={unit} className="rounded-lg bg-gray-50 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-600 sm:text-sm">{getUnitLabel(category, unit)}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">{getUnitSymbol(category, unit)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
