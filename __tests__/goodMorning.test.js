const { assert } = require("chai");
const getRandomPhrase = require("../utils/goodMorning");

function* mockRandom() {
  for (const n of [0, 1]) yield n;
}
const mock = mockRandom();
global.Math.random = () => mock.next().value;

describe("goodMorning phrases", () => {
  describe("getRandomPhrase()", () => {
    it("should return a different phrase every time its called", () => {
      const phraseOne = getRandomPhrase();
      const phraseTwo = getRandomPhrase();

      assert.notEqual(phraseOne, phraseTwo);
      assert(phraseOne !== undefined);
      assert(phraseTwo !== undefined);
    });
  });
});
