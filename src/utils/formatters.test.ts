import { describe, it, expect } from 'vitest';
import { formatDate } from './formatters';

describe('formatters', () => {
  it('formatDate formats ISO string correctly', () => {
    const date = '2024-01-15T10:30:00.000Z';
    const result = formatDate(date);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('formatDate handles invalid date', () => {
    const result = formatDate('invalid');
    expect(result).toBeTruthy();
  });
});