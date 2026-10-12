/**
 * Format an amount in Indian Rupees (INR).
 * @param amount Numeric value to format
 * @param includeSymbol Whether to prepend the ₹ symbol (default: true)
 */
export function formatINR(amount: number, includeSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);

  return includeSymbol ? `₹${formatted}` : formatted;
}

export function formatPrice(amount: number): string {
  return formatINR(amount, true);
}
