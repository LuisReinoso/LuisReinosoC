import { AbstractControl } from '@angular/forms';
import { isTodayOrFutureDateValidator, isRevisionDateOneYearLaterValidator } from './date.validator';

describe('Date Validators tests', () => {
  describe('isTodayOrFutureDateValidator', () => {
    it("should return null for today's date when date is today", () => {
      const control = { value: new Date().toISOString().split('T')[0] } as AbstractControl;
      expect(isTodayOrFutureDateValidator(control)).toBeNull();
    });

    it('should return null for future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const control = { value: futureDate.toISOString().split('T')[0] } as AbstractControl;
      expect(isTodayOrFutureDateValidator(control)).toBeNull();
    });

    it('should return error for past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const control = { value: pastDate.toISOString().split('T')[0] } as AbstractControl;
      expect(isTodayOrFutureDateValidator(control)).toEqual({ dateValid: true });
    });

    it("should return null for today's date when date is today", () => {
      const control = { value: 'asdasd'} as AbstractControl;
      expect(isTodayOrFutureDateValidator(control)).toEqual({ dateValid: true });
    });
  });

  describe('isRevisionDateOneYearLaterValidator', () => {
    it('should return null when release date is not provided', () => {
      const control = {
        value: new Date().toISOString(),
        root: { get: (param: string) => ({ value: '' }) },
      } as AbstractControl;

      const validator = isRevisionDateOneYearLaterValidator('releaseDate');

      expect(validator(control)).toBeNull();
    });

    it('should return error for a revision date in not exactly one year later', () => {
      const releaseDate = new Date('2025-01-01');
      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(releaseDate.getFullYear() + 2);
      const control = {
        value: releaseDate.toISOString(),
        root: { get: (param: string) => ({ value: oneYearLater.toISOString() }) },
      } as AbstractControl;

      const validator = isRevisionDateOneYearLaterValidator('releaseDate');

      expect(validator(control)).toStrictEqual({ dateValid: true });
    });

    it('should return null for a revision date is exactly one year later', () => {
      const releaseDate = new Date();
      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(releaseDate.getFullYear() + 1);
      const control = {
        value: oneYearLater.toISOString(),
        root: { get: (param: string) => ({ value: releaseDate.toISOString() }) },
      } as AbstractControl;

      const validator = isRevisionDateOneYearLaterValidator('releaseDate');

      expect(validator(control)).toBeNull();
    });
  });
});
