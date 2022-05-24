export function todayObject() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return { year, month, day };
}

export function today() {
  const { year, month, day } = todayObject();
  return dateSplitFormat(year, month, day);
}

export function dateSplitFormat(year: number, month: number, day: number, seprator: string = '/') {
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  return `${year}${seprator}${formattedMonth}${seprator}${formattedDay}`;
}
