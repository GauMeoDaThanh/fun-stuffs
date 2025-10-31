/**
 * Converts environment variables to .env.example format
 * Replaces values with placeholder dots (...)
 */

export interface ConversionResult {
  output: string;
  count: number;
}

/**
 * Converts a single env line to example format
 * POSTGRES_DB='echatbot' -> POSTGRES_DB=...
 * POSTGRES_DB="echatbot" -> POSTGRES_DB=...
 * POSTGRES_DB=echatbot -> POSTGRES_DB=...
 */
export function convertEnvLine(line: string): string {
  // Trim whitespace
  const trimmedLine = line.trim();

  // Skip empty lines and comments
  if (!trimmedLine || trimmedLine.startsWith('#')) {
    return line;
  }

  // Match pattern: KEY=VALUE (with or without quotes)
  const envVarPattern = /^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/i;
  const match = trimmedLine.match(envVarPattern);

  if (!match) {
    return line;
  }

  const [, key] = match;

  // Preserve indentation from original line
  const indentation = line.match(/^\s*/)?.[0] || '';

  return `${indentation}${key}=...`;
}

/**
 * Converts multiple environment variables to .env.example format
 */
export function convertEnvToExample(input: string): ConversionResult {
  const lines = input.split('\n');
  const convertedLines: string[] = [];
  let count = 0;

  for (const line of lines) {
    const convertedLine = convertEnvLine(line);
    convertedLines.push(convertedLine);

    // Count if the line was actually converted (had a value replaced)
    if (line !== convertedLine && line.trim() && !line.trim().startsWith('#')) {
      count++;
    }
  }

  return {
    output: convertedLines.join('\n'),
    count,
  };
}

/**
 * Example inputs for demonstration
 */
export const exampleInputs = [
  `POSTGRES_DB='echatbot'
POSTGRES_USER="admin"
POSTGRES_PASSWORD=secret123
API_KEY=abc-def-ghi`,

  `# Database Configuration
DATABASE_URL='postgresql://user:password@localhost:5432/mydb'
DATABASE_POOL_SIZE=10

# API Keys
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxx"
STRIPE_SECRET_KEY=sk_test_xxxxxxxxx

# App Settings
APP_NAME=MyApp
PORT=3000`,

  `NODE_ENV=production
NEXT_PUBLIC_API_URL="https://api.example.com"
SECRET_TOKEN='very-secret-token'
DEBUG=true`,
];
