export const getFormattedDate = (date) => {
  console.log("date is: ", date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDateMinusDays = (date, days) => {
  console.log("date 2 is:", date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
