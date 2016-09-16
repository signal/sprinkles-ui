import { NoticeColors } from '../src/shared/colors';

describe('Colors', () => {
  it('Does have expected color values', () => {
    expect(NoticeColors.danger).toEqual('#D9534F');
  });
});
