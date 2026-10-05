/** Parses the first "$12.34" amount in a string into cents. */
export function toCents(text: string): number {
  const match = text.match(/\$(\d+)\.(\d{2})/);
  if (!match) throw new Error(`No dollar amount in "${text}"`);
  return Number(match[1]) * 100 + Number(match[2]);
}
