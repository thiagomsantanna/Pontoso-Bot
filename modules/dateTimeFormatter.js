const calendar = {
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
    const date = `${calendar.day()}/${calendar.month()}/${calendar.year()}`;
    const time = `${calendar.hours()}:${calendar.minutes()}`;

    return date + " - " + time;
  },
  date() {
    return `${calendar.day()}/${calendar.month()}/${calendar.year()}`;
  },
};
