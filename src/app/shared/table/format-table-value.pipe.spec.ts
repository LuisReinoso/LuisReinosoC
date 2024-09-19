import { FormatTableValuePipe } from './format-table-value.pipe';

describe('FormatTableValuePipe', () => {
  let pipe: FormatTableValuePipe;

  beforeEach(() => {
    pipe = new FormatTableValuePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a Date object to a localized date string', () => {
    const date = new Date('2024-09-19T00:00:00-05:00');
    const formattedDate = pipe.transform(date);
    expect(formattedDate).toBe('19/9/2024');
  });

  it('should return the input string as is', () => {
    const input = 'Hello, World!';
    const result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should convert an empty string to a string', () => {
    const input = '';
    const result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should convert a number input to a string', () => {
    const input = 42;
    const result = pipe.transform(input as any);
    expect(result).toBe('42');
  });

  it('should convert other non-string values to string', () => {
    const input = true;
    const result = pipe.transform(input as any);
    expect(result).toBe('true');
  });
});
