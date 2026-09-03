/**
 * Unit tests for P4 join-ref → bare classId resolution (Add Class / Onboarding).
 * Run: node --experimental-strip-types scripts/test-join-class.mjs
 */
import { parseJoinRef } from "../src/common/joinClass.ts";

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
    console.error(
      `FAIL: ${label}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`
    );
  } else {
    console.log(`ok: ${label}`);
  }
}

const org = "mvla.net";
const orgAt = "@mvla.net";

console.log("--- parseJoinRef (P4 flat enroll) ---\n");

assertEq(parseJoinRef(null, org), null, "null → null");
assertEq(parseJoinRef("", org), null, "empty → null");
assertEq(parseJoinRef("   ", org), null, "whitespace → null");

assertEq(
  parseJoinRef("abc123", org),
  { classId: "abc123", needsTeacherLookup: true },
  "bare classId needs teacher dual-read"
);

assertEq(
  parseJoinRef("t@mvla.net/abc123", org),
  { classId: "abc123", teacherEmail: "t@mvla.net", needsTeacherLookup: false },
  "email/classId → bare classId + teacher"
);

assertEq(
  parseJoinRef("t@mvla.net~abc123", org),
  { classId: "abc123", teacherEmail: "t@mvla.net", needsTeacherLookup: false },
  "email~classId → bare classId + teacher"
);

assertEq(
  parseJoinRef("t~abc123", org),
  { classId: "abc123", teacherEmail: "t@mvla.net", needsTeacherLookup: false },
  "local~classId expands org domain"
);

assertEq(
  parseJoinRef("t~abc123", orgAt),
  { classId: "abc123", teacherEmail: "t@mvla.net", needsTeacherLookup: false },
  "local~classId with @orgDomain store form"
);

assertEq(
  parseJoinRef("  teacher@mvla.net/cls9  ", org),
  { classId: "cls9", teacherEmail: "teacher@mvla.net", needsTeacherLookup: false },
  "trims whitespace around join ref"
);

assert(parseJoinRef("only-id", org)?.needsTeacherLookup === true, "short ref flags lookup");
assert(parseJoinRef("a@b.c/id", org)?.needsTeacherLookup === false, "prefixed ref skips lookup");

if (failed) {
  console.error(`\n${failed} failure(s)`);
  process.exit(1);
}
console.log("\nall join-class tests passed");
