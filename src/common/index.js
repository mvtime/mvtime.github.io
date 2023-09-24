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
/** Log function, takes any number of arguments. If the first character is nonstandard and followed by a space, it'll use that as a tag */
function _log() {
  if (arguments.length == 0) return;
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
    console[this || tone](...extras, ...args);
  } catch (err) {
    console._log("⚠ Couldn't override console.log", err);
    console._log(...extras, ...args);
  }
}
try {
  console._log = console.log;
  console.log = _log;
} catch (err) {
  _log("⚠ Couldn't override console.log", err);
}

let tone = "info";
const _status = {
  toned: _log,
  print: _log,
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
const _statuslog = _log.bind("info");
try {
  window._status = _status;
  _log("🔧 Initialized logger");
} catch (err) {
  _log("⚠ Couldn't set window._status", err);
}
export { _statuslog, _log, _status };
