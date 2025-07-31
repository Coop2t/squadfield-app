/**
 * Simple className combiner utility
 * Combines multiple class names and filters out falsy values
 */
export function cn(...inputs) {
  return inputs
    .filter(Boolean)
    .map(input => String(input))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
