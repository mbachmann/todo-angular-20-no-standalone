import {TempConverterPipe} from './temp-converter.pipe';

describe('TempConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new TempConverterPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "0 degrees" to "-17.78 Fahrenheit" ', () => {
    const pipe = new TempConverterPipe();
    expect(pipe.transform(32, 'C')).toBe('0.00');
  });

  it('transforms "32 Fahrenheit" to "0 degrees" ', () => {
    const pipe = new TempConverterPipe();
    expect(pipe.transform(0, 'F')).toBe('32.00');
  });

});
