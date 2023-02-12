import type { WindDirection } from "./interfaces";

/**
 * Debounce function
 * @callback func initial function
 * @param {number} ms duration
 * @returns {function():void} debounced function
 */
export const debounce = function (func: any, ms: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    // eslint-disable-next-line
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
};

/**
 * Calc remote time
 * @param {number} dt open weather date time
 * @param {number} timezone remote timezone
 * @returns {Date} time for remote timezone
 */
export const dateAndTimeForRemote = function (
  dt: number,
  timezone: number
): string[] {
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const utcTime = dt * 1000 + localTimezoneOffset;

  const remoteDateAndTime = new Date(utcTime + timezone * 1000).toLocaleString(
    "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    }
  );

  const remoteDateAndTimeArr = remoteDateAndTime.split(", ");

  const remoteDay = remoteDateAndTimeArr[0];
  const remoteMounth = remoteDateAndTimeArr[1].split(" ")[0];
  const remoteDate = remoteDateAndTimeArr[1].split(" ")[1];
  const remoteTime = remoteDateAndTimeArr[2];

  return [remoteDateAndTime, remoteDay, remoteMounth, remoteDate, remoteTime];
};

/**
 * Transform degrees to wind direction
 * @param {number} deg wind direction in degrees
 * @returns {WindDirection} wind direction
 */
export const degreesToWindDirection = function (deg: number): WindDirection {
  switch (true) {
    case deg > 314:
      return "N-W";
    case deg > 269:
      return "W";
    case deg > 224:
      return "S-W";
    case deg > 179:
      return "S";
    case deg > 134:
      return "S-E";
    case deg > 89:
      return "E";
    case deg > 44:
      return "N-E";
    default:
      return "N";
  }
};
