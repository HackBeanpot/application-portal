import { describe, expect, test } from '@jest/globals';
import { ConfirmByState, useConfirmByState } from '../components/hooks/useConfirmByState';

const mockSystemDate = (d: Date) => {
  jest.useFakeTimers().setSystemTime(d.getTime());
};

describe('confirm by tests', () => {
  const confirmDate = new Date('1/21/2022');

  test('before', () => {
    mockSystemDate(new Date('1/1/2022'));
    expect(useConfirmByState({ confirmBy: confirmDate })).toBe(ConfirmByState.Before);
  });

  test('after', () => {
    mockSystemDate(new Date('2/1/2022'));
    expect(useConfirmByState({ confirmBy: confirmDate })).toBe(ConfirmByState.After);
  });
});
