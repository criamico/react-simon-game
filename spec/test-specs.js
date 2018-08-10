import Eng from '../src/engine';

describe('Function getRandomInRange', () => {
  it('returns a number greater than 0', () => {
    expect(Eng.getRandomInRange(0, 4) >= 0).toBe(true);
  });

  it('returns a number smaller than 4', () => {
    expect(Eng.getRandomInRange(0, 4) <= 4).toBe(true);
  });
});
