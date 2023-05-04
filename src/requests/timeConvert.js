export function timeConvert(timevalue) {
  let difference = new Date().getTime() - new Date(timevalue).getTime();

  let yearsDifference = Math.floor(difference / 1000 / 12 / 60 / 60 / 24);
  difference -= yearsDifference * 1000 * 12 * 60 * 60 * 24;

  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  const convertedTimeObj = {
    yearsDifference: yearsDifference,
    daysDifference: daysDifference,
    hoursDifference: hoursDifference,
    minutesDifference: minutesDifference,
  };

  const one = convertedTimeObj?.yearsDifference
    ? convertedTimeObj?.yearsDifference
    : convertedTimeObj?.daysDifference
    ? convertedTimeObj?.daysDifference
    : convertedTimeObj?.hoursDifference
    ? convertedTimeObj?.hoursDifference
    : convertedTimeObj?.minutesDifference
    ? convertedTimeObj?.minutesDifference
    : "just now";

  const two =
    convertedTimeObj?.yearsDifference > 1
      ? "years ago"
      : convertedTimeObj?.yearsDifference === 1
      ? "year ago"
      : convertedTimeObj?.daysDifference > 1
      ? "days ago"
      : convertedTimeObj?.daysDifference === 1
      ? "day ago"
      : convertedTimeObj?.hoursDifference > 1
      ? "hours ago"
      : convertedTimeObj?.hoursDifference === 1
      ? "hour ago"
      : convertedTimeObj?.minutesDifference > 1
      ? "minutes ago"
      : convertedTimeObj?.minutesDifference === 1
      ? "minute ago"
      : "";

  return one + " " + two;
}
