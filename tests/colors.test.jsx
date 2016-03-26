// don"t mock our CUT or components it depends on
jest.dontMock("../src/shared/colors");

const Colors = require("../src/shared/colors").Colors;

describe("Colors", () => {
  it("Does have expected color values", () => {
    expect(Colors.danger).toEqual("#DF2E3C");
  });
});
