/**
 * Holds common functions used throughout the application (mostly for debugging and logging)
 * @file common/index.ts
 * @namespace common
 */

declare global {
  interface Window {
    _status: object; // Replace 'any' with a more specific type according to your needs
  }
}
enum LogTone {
  Log = "log",
  Info = "info",
  Debug = "debug",
  Warn = "warn",
  Error = "error",
}

let tone: LogTone = LogTone.Info;
/** Save log messages for future debug */
interface LogEntry {
  time: Number;
  message: any;
  type: LogTone;
}
let log: LogEntry[] = [],
  log_time: Date = new Date();

/** Save log to file */
function save(content: string, download = "log.txt"): void {
  let a = window.document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  a.download = download;
  a.click();
}
function format_stream(stream: LogEntry[]): string {
  return stream.length
    ? stream
        .map((line) => `${line.time} [${line.type}]: ${JSON.stringify(line.message)}`)
        .join("\n\n")
    : `No log entries found; last cleared ${log_time.toISOString()}`;
}

/** Imperfect helper for _status.log() */
function getFirstNonStandardCharacter(str: string): string | null {
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
function _log(this: LogTone, ...args: any[]): void {
  log.push({ time: Date.now(), message: arguments[0], type: tone || LogTone.Log });
  if (arguments.length == 0) return;
  // check for very large messages and warn them in the console with the first 100 characters (make sure this catches the message, even if it's not the first argument, or in a object format)
  let extras = [
    `%c${process.env.VUE_APP_BRAND_NAME_SHORT}`,
    `background:#${process.env.VUE_APP_THEME_CONSOLE_COLOR_BG || "272727"};color:#${
      process.env.VUE_APP_THEME_CONSOLE_COLOR_TEXT || "C9B092"
    };padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em`,
  ];
  // check if first character is emoji, followed by space
  if (getFirstNonStandardCharacter(args[0]) != null) {
    // remove the first two characters from the first argument
    extras[0] += " %c" + getFirstNonStandardCharacter(args[0]);
    extras[2] = `background:#${
      process.env.VUE_APP_THEME_CONSOLE_COLOR_TEXT || "C9B092"
    }aa;background:#ffffffaa;color:#${
      process.env.VUE_APP_THEME_CONSOLE_COLOR_BG || "272727"
    };padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em`;
    args[0] = args[0].substring(2).trimStart();
  }
  try {
    console[this](...extras, ...args);
  } catch (err) {
    console.log("⚠ Couldn't override console.log", err);
    console.log(...extras, ...args);
  }
}

/**
 * @object _status
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
  log: _log.bind(LogTone.Log),
  info: _log.bind(LogTone.Info),
  debug: _log.bind(LogTone.Debug),
  warn: _log.bind(LogTone.Warn),
  error: _log.bind(LogTone.Error),
  clearStream: (): void => {
    log = [];
    console.clear();
    log_time = new Date();
  },
  getStream: (types: string[] = []) => {
    return types && types.length > 0 ? log.filter((entry) => types.includes(entry.type)) : log;
  },
  textStream(types: string[] = []): string {
    return format_stream(_status.getStream(types));
  },
  saveStream: (id: string = "manual"): void => {
    let date = new Date(),
      data = _status.getStream();
    date.setSeconds(0, 0);
    downloadLogData(data, date, id);
  },
  _getTone: (): string => {
    return tone;
  },
  _setTone: (new_tone: LogTone): void => {
    tone = new_tone;
  },
  _resetTone: () => {
    tone = LogTone.Info;
  },
};
/**
 * @function downloadLogData
 * @description downloads a file with given log data
 * */
function downloadLogData(data: LogEntry[], date: Date, id: string = "manual"): void {
  try {
    save(
      format_stream(data),
      `${process.env.VUE_APP_BRAND_NAME_SHORT}-log ${id} ${date
        .toISOString()
        .split(":00.0")[0]
        .replace("T", " ")
        .replace(":", "h")}m.log`
    );
    _status.log("📜 Saved log stream to disk; run `_status.clearStream()` to purge if local");
  } catch (err) {
    _status.error("📜 Couldn't save log stream", err);
  }
}
/**
 * @function _statuslog
 * @description A bound version of _log with the tone set to "info"
 * @example _statuslog("Hello world!");
 * */
const _statuslog: Function = _log.bind(LogTone.Info);
try {
  const version: string = document.getElementById("version")?.textContent || "< not found >";
  _status.log(`🚀 Loaded into ${process.env.NODE_ENV} build @ version [${version}]`);
  _status.info("📜 Initialized logger");
  window._status = _status;
} catch (err) {
  _status.log("⚠ Couldn't set window._status", err);
}

/* Fixes for safari date handling (convert date strings to acceptable format) */
/**
 * @function compatDateObj
 * @description Converts a date string to a Date object (in a format that Safari can handle)
 * @param {String} date
 * @returns {Date}
 */
function compatDateObj(date: string | any): Date | any {
  if (typeof date != "string") return date;
  return new Date(date.replace(/-/g, "/"));
}

/**
 * @function msToTime
 * @description Converts milliseconds to hours:minutes:seconds timestamp; only includes hours if non-zero
 * @param {Number} ms
 * @returns {String}
 */
function msToTime(ms: number): string {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  let time = hours > 0 ? hours + ":" + (minutes < 10 ? "0" : "") : "";
  time += `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return time;
}

export { _statuslog, _status, compatDateObj, msToTime, downloadLogData };
