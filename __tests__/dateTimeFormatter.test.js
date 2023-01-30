/* eslint-disable no-undef */
const { assert } = require("chai");
const { date, dateTime } = require("../modules/dateTimeFormatter");

beforeAll(() => {
  jest
    .useFakeTimers("modern")
    .setSystemTime(new Date("2002", "11", "10", "2", "12"));
});

describe("dateTimeFormatter", () => {
  describe("dateTime()", () => {
    it("should return the current date and time formatted", () => {
      assert.strictEqual(dateTime(), "10/12/2002 - 2:12");
    });
    it("should return the current date with time formatted with minutes lower than 9", () => {
      jest
        .useFakeTimers("modern")
        .setSystemTime(new Date("2002", "11", "10", "2", "9"));

      assert.strictEqual(dateTime(), "10/12/2002 - 2:09");
    });
  });
  describe("date()", () => {
    it("should return the current date", () => {
      assert.strictEqual(date(), "10/12/2002");
    });
  });
});
