// don"t mock our CUT or components it depends on
jest.dontMock("../src/shared/colors");

const colors = require("../src/shared/colors").default;

describe("colors", () => {
  it("Does have expected color values", () => {
    expect(colors.ButtonEnabledBackground).toEqual("#00ADEF");
  });
});
