// don't mock our CUT or components it depends on
jest.dontMock('../src/shared/zindex');

const zindex = require('../src/shared/zindex').default;

describe('zindex', () => {
  it('Does have expected zindex values', () => {
    expect(zindex).toEqual({
      Drawer: 1300,
      PopoverClose: 2010,
      Popover: 2100,
    });
  });
});
