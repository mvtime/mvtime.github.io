/** Imperfect helper for _status.log() */
function getFirstNonStandardCharacter(str) {
  try {
    const match = str.match(
      /^([\P{L}\p{Extended_Pictographic}]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))/u
    );
    return match ? match[0] : null;
  } catch (err) {
    return null;
  }
}
/**
 * @function _log
 * @description Log function, takes any number of arguments. If the first character is nonstandard and followed by a space, it'll use that as a tag
 * @param {any} args - Any number of arguments
 * @note This function is not exported, but is used by _status. It should be used with a tone through a bind, like _log.bind("info")
 * @example _log("Hello world!");
 * */
function _log() {
  if (arguments.length == 0) return;
  // check for very large messages and warn them in the console with the first 100 characters (make sure this catches the message, even if it's not the first argument, or in a object format)
  let args = Array.from(arguments);
  let extras = [
    `%cMVTT`,
    "background:#272727;color:#C9B092;padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em",
  ];
  // check if first character is emoji, followed by space
  if (getFirstNonStandardCharacter(args[0]) != null) {
    // remove the first two characters from the first argument
    extras[0] += " %c" + getFirstNonStandardCharacter(args[0]);
    extras[2] =
      "background:#C9B092aa;background:#ffffffaa;color:#272727;padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em";
    args[0] = args[0].substring(2).trimStart();
  }
  try {
    console[this](...extras, ...args);
  } catch (err) {
    console.log("⚠ Couldn't override console.log", err);
    console.log(...extras, ...args);
  }
}

let tone = "info";
/**
 * @type {Object} _status
 * @property {Function} print - Prints a message to the console with the current tone
 * @property {Function} log - Logs a message to the console
 * @property {Function} info - Logs an info message to the console
 * @property {Function} debug - Logs a debug message to the console
 * @property {Function} warn - Logs a warning message to the console
 * @property {Function} error - Logs an error message to the console
 * @property {Function} _getTone - Gets the current tone
 * @property {Function} _setTone - Sets the current tone
 * @property {Function} _resetTone - Resets the current tone to "info"
 * @example _status.log("Hello world!");
 */
const _status = {
  print: _log.bind(tone),
  log: _log.bind("log"),
  info: _log.bind("info"),
  debug: _log.bind("debug"),
  warn: _log.bind("warn"),
  error: _log.bind("error"),

  _getTone: () => {
    return tone;
  },
  _setTone: (new_tone) => {
    tone = new_tone;
  },
  _resetTone: () => {
    tone = "info";
  },
};
/**
 * @type {Function} _statuslog
 * @description A bound version of _log with the tone set to "info"
 * @example _statuslog("Hello world!");
 * */
const _statuslog = _log.bind("info");
try {
  window._status = _status;
  _status.log("🔧 Initialized logger");
} catch (err) {
  _status.log("⚠ Couldn't set window._status", err);
}

/* Fixes for safari date handling (convert date strings to acceptable format) */
/**
 * @function compatDateObj
 * @description Converts a date string to a Date object (in a format that Safari can handle)
 * @param {String} date
 * @returns
 */
function compatDateObj(date) {
  if (typeof date != "string") return date;
  return new Date(date.replace(/-/g, "/"));
}

export { _statuslog, _status, compatDateObj };
