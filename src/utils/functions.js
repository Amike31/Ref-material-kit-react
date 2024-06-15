function convertNumberString(number) {
  // 1000000 => "1.000.000"
  return number.toLocaleString();
}

function convertMoneyString(salary) {
  // 1000000 => "IDR 1.000.000"
  return `IDR ${convertNumberString(salary)}`;
}

function convertSalaryRange(salary) {
  // [1000000, 5000000] => "IDR 1.000.000 - IDR 5.000.000"
  return `${convertMoneyString(salary[0])} - ${convertMoneyString(salary[1])}`;
}

function dateConverter(date) {
  // Date.now() => "1 January 2022"
  return new Date(date).toDateString();
}

function dateDifference(date) {
  const currentDate = new Date();
  const jobDate = new Date(date);
  const timeDifference = currentDate - jobDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(weeksDifference / 4);
  const yearsDifference = Math.floor(monthsDifference / 12);

  if (daysDifference < 1) {
    return "Today";
  }
  if (weeksDifference < 2) {
    return `${daysDifference} days ago`;
  }
  if (monthsDifference < 1) {
    return `${weeksDifference} weeks ago`;
  }
  if (yearsDifference < 1) {
    return `${monthsDifference} months ago`;
  }
  return `${yearsDifference} years ago`;
}

export {
  convertNumberString,
  convertMoneyString,
  convertSalaryRange,
  dateConverter,
  dateDifference,
};
