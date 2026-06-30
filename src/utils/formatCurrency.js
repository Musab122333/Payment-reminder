/**
 * Formats a number into Indian Rupee format with a space after the symbol.
 * Example: 96700 → "₹ 96,700"
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  return `₹ ${formatted}`;
};