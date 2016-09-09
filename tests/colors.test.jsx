import { Colors } from '../src/shared/colors';

describe('Colors', () => {
  it('Does have expected color values', () => {
    expect(Colors.danger).toEqual('#D9534F');
  });
});
