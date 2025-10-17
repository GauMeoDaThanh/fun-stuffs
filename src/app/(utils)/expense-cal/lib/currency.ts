export const currencies = ['VND', 'USD'] as const;
export type Currency = (typeof currencies)[number];

interface CurrencyConfig {
  symbol: string;
  displayMultiplier: number; // multiply user input by this to get actual value
  decimalPlaces: number;
  locale: string;
  name: string;
}

export const currencyConfig: Record<Currency, CurrencyConfig> = {
  VND: {
    symbol: '₫',
    displayMultiplier: 1000, // User types 100 → 100,000 VND
    decimalPlaces: 0,
    locale: 'vi-VN',
    name: 'Vietnamese Đồng',
  },
  USD: {
    symbol: '$',
    displayMultiplier: 1, // User types 100 → 100 USD
    decimalPlaces: 2,
    locale: 'en-US',
    name: 'US Dollar',
  },
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const config = currencyConfig[currency];
  const formatter = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  });
  return `${formatter.format(amount)} ${currency}`;
};

export const formatCurrencyWithSymbol = (amount: number, currency: Currency): string => {
  const config = currencyConfig[currency];
  const formatter = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  });
  return `${config.symbol}${formatter.format(amount)}`;
};
