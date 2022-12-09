const clock = {
  day: () => new Date().getDate(),
  month: () => new Date().getMonth() + 1,
  year: () => new Date().getFullYear(),
  hours: () => new Date().getHours(),
  minutes: () => {
    const min = new Date().getMinutes();
    return min <= 9 ? `0${min}` : min;
  },
};

module.exports = {
  dateTime() {
    const date = `${clock.day()}/${clock.month()}/${clock.year()}`;
    const time = `${clock.hours()}:${clock.minutes()}`;

    return date + " - " + time;
  },
  date() {
    return `${clock.day()}/${clock.month()}/${clock.year()}`;
  },
};
