
import { PollutionLevelPipe } from './pollution-level-pipe';

describe('PollutionLevelPipe', () => {
  let pipe: PollutionLevelPipe;

  beforeEach(() => {
    pipe = new PollutionLevelPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Faible for values between 0 and 20', () => {
    expect(pipe.transform(0)).toBe('Faible');
    expect(pipe.transform(20)).toBe('Faible');
  });

  it('should return Modérée for values between 21 and 50', () => {
    expect(pipe.transform(21)).toBe('Modérée');
    expect(pipe.transform(50)).toBe('Modérée');
  });

  it('should return Élevée for values between 51 and 100', () => {
    expect(pipe.transform(51)).toBe('Élevée');
    expect(pipe.transform(100)).toBe('Élevée');
  });

  it('should return Dangereuse for values above 100', () => {
    expect(pipe.transform(101)).toBe('Dangereuse');
    expect(pipe.transform(150)).toBe('Dangereuse');
  });
});
