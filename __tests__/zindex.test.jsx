// don"t mock our CUT or components it depends on
jest.dontMock("../src/shared/zindex");

const zindex = require("../src/shared/zindex").default;

describe("zindex", () => {
  it("Does have expected zindex values", () => {
    expect(zindex).toEqual({
      Popover: 2100
    });
  });
});
