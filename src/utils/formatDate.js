/**
 * Formats a date string (YYYY-MM-DD) to "DD-Mon-YYYY" format.
 * Constructs date locally to avoid UTC timezone offset shifting the date.
 * Example: "2026-06-25" → "25-Jun-2026"
 * @param {string} dateString - ISO date string "YYYY-MM-DD"
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  // Construct as local date to avoid UTC off-by-one on IST systems
  const date = new Date(year, month - 1, day);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
  const d = parts.find((p) => p.type === 'day').value;
  const m = parts.find((p) => p.type === 'month').value;
  const y = parts.find((p) => p.type === 'year').value;
  return `${d}-${m}-${y}`;
};