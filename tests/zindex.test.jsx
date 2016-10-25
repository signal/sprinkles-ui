import zindex from '../src/shared/zindex';

describe('zindex', () => {
  it('Does have expected zindex values', () => {
    expect(zindex).toEqual({
      Drawer: 1300,
      PopoverClose: 2010,
      Popover: 2100,
      SearchIcon: 100,
    });
  });
});
