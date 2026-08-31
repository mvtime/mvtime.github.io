/**
 * Unit tests for class/task path parsers and short-share helpers.
 * Run: node --experimental-strip-types scripts/test-paths.mjs
 */
import {
  parseClassId,
  parseTaskId,
  shortShareRef,
  shortRefIfPrefixed,
  humanTeachers,
  isCanvasImportEmail,
  classPath,
  taskPath,
  looksLikeEmail,
  splitRefSegments,
  writeClassId,
  writeTaskIds,
  bareClassIdFromEnrollment,
  flatClassPath,
  flatTaskPath,
} from "../src/common/paths.ts";

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
  } else {
    console.log("ok:", msg);
  }
}

function assertEq(actual, expected, label) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failed++;
    console.error(`FAIL: ${label}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok: ${label}`);
  }
}

const org = "mvla.net";

console.log("--- path parser tests ---\n");

assertEq(parseClassId("abc123", org), { classId: "abc123", hasTeacherPrefix: false }, "classId only");
assertEq(parseClassId("t@mvla.net/abc123", org), {
  teacherEmail: "t@mvla.net",
  classId: "abc123",
  hasTeacherPrefix: true,
}, "email/classId");
assertEq(parseClassId("t~abc123", org), {
  teacherEmail: "t@mvla.net",
  classId: "abc123",
  hasTeacherPrefix: true,
}, "local~classId");

assertEq(parseTaskId("abc123/task9", org), {
  classId: "abc123",
  taskId: "task9",
  hasTeacherPrefix: false,
}, "classId/taskId");
assertEq(parseTaskId("t@mvla.net/abc123/task9", org), {
  teacherEmail: "t@mvla.net",
  classId: "abc123",
  taskId: "task9",
  hasTeacherPrefix: true,
}, "email/classId/taskId");
assertEq(parseTaskId("t~abc123~task9", org), {
  teacherEmail: "t@mvla.net",
  classId: "abc123",
  taskId: "task9",
  hasTeacherPrefix: true,
}, "local~classId~taskId");
assertEq(parseTaskId("abc123~task9", org), {
  classId: "abc123",
  taskId: "task9",
  hasTeacherPrefix: false,
}, "classId~taskId");

assertEq(classPath("t@mvla.net", "abc123"), "t@mvla.net/abc123", "classPath nested (legacy)");
assertEq(taskPath("t@mvla.net", "abc123", "task9"), "t@mvla.net/abc123/task9", "taskPath nested (legacy)");

assertEq(shortShareRef("abc123"), "abc123", "short class");
assertEq(shortShareRef("abc123", "task9"), "abc123~task9", "short task");

assertEq(shortRefIfPrefixed("t~abc123~task9", org), "abc123~task9", "shorten 3-seg task");
assertEq(shortRefIfPrefixed("t@mvla.net/abc123", org), "abc123", "shorten email class");
assertEq(shortRefIfPrefixed("abc123", org), null, "already short class");
assertEq(shortRefIfPrefixed("abc123~task9", org), null, "already short task");

assert(looksLikeEmail("a@b.c"), "looksLikeEmail true");
assert(!looksLikeEmail("abc"), "looksLikeEmail false");
assert(isCanvasImportEmail("canvas.import@mvla.net"), "canvas import email");
assert(!isCanvasImportEmail("teacher@mvla.net"), "human teacher email");

assertEq(
  humanTeachers([
    { email: "a@x.com", name: "A", role: "owner" },
    { email: "canvas.import@mvla.net", name: "Canvas", role: "owner" },
    null,
  ]),
  [{ email: "a@x.com", name: "A", role: "owner" }],
  "humanTeachers filters canvas"
);

assertEq(splitRefSegments("a~b/c"), ["a", "b", "c"], "split mixed separators");

console.log("\n--- write helper tests ---\n");

assertEq(writeClassId("abc123", org), "abc123", "writeClassId bare");
assertEq(writeClassId("t@mvla.net/abc123", org), "abc123", "writeClassId email/classId");
assertEq(writeClassId("t~abc123", org), "abc123", "writeClassId local~classId");
assertEq(bareClassIdFromEnrollment("abc123"), "abc123", "enrollment bare");
assertEq(bareClassIdFromEnrollment("t@mvla.net/abc123"), "abc123", "enrollment nested");
assertEq(flatClassPath("abc123"), "abc123", "flatClassPath");
assertEq(flatTaskPath("abc123", "task9"), "abc123/task9", "flatTaskPath");
assertEq(writeTaskIds("abc123/task9", org), { classId: "abc123", taskId: "task9" }, "writeTaskIds flat slash");
assertEq(writeTaskIds("abc123~task9", org), { classId: "abc123", taskId: "task9" }, "writeTaskIds flat tilde");
assertEq(
  writeTaskIds("t@mvla.net/abc123/task9", org),
  { classId: "abc123", taskId: "task9" },
  "writeTaskIds legacy email path"
);
assertEq(
  writeTaskIds("t~abc123~task9", org),
  { classId: "abc123", taskId: "task9" },
  "writeTaskIds legacy local path"
);

console.log("\n--- done ---\n");
if (failed) {
  console.error(`${failed} assertion(s) failed`);
  process.exit(1);
}
console.log("All assertions passed.");
