/**
 * Unit tests for linked-account Acting-as chip visibility + school email resolution.
 * Run: node --experimental-strip-types scripts/test-acting-as.mjs
 */
import {
  actingAsLabel,
  isActingAsLinked,
  resolveActingAsEmail,
  schoolUidFromClaims,
  shouldShowActingAsChip,
} from "../src/common/actingAs.ts";

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
  const ok = actual === expected;
  if (!ok) {
    failed++;
    console.error(`FAIL: ${label}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok: ${label}`);
  }
}

console.log("--- school_uid claim parse ---\n");

assertEq(schoolUidFromClaims(null), null, "null claims");
assertEq(schoolUidFromClaims(undefined), null, "undefined claims");
assertEq(schoolUidFromClaims({}), null, "empty claims");
assertEq(schoolUidFromClaims({ school_uid: "" }), null, "empty school_uid");
assertEq(schoolUidFromClaims({ school_uid: "   " }), null, "whitespace school_uid");
assertEq(schoolUidFromClaims({ school_uid: 123 }), null, "non-string school_uid");
assertEq(schoolUidFromClaims({ school_uid: "schoolUidABC" }), "schoolUidABC", "valid school_uid");

console.log("\n--- isActingAsLinked ---\n");

assert(
  !isActingAsLinked({ personalAccount: false, linkedTo: null, schoolUidClaim: null }),
  "org login, no claim → not acting as"
);
assert(
  !isActingAsLinked({ personalAccount: true, linkedTo: null, schoolUidClaim: null }),
  "personal without linked_to → not acting as"
);
assert(
  isActingAsLinked({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: null,
  }),
  "personal + linked_to fallback → acting as"
);
assert(
  isActingAsLinked({
    personalAccount: false,
    linkedTo: null,
    schoolUidClaim: "schoolUidABC",
  }),
  "school_uid claim alone → acting as (prefer claim)"
);
assert(
  isActingAsLinked({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: "schoolUidABC",
  }),
  "claim + personal linked → acting as"
);

console.log("\n--- resolveActingAsEmail / chip visibility ---\n");

assertEq(
  resolveActingAsEmail({
    personalAccount: false,
    linkedTo: null,
    schoolUidClaim: null,
    activeDocEmail: "student@andrew.cmu.edu",
    userEmail: "student@andrew.cmu.edu",
  }),
  null,
  "org login → no acting-as email"
);

assertEq(
  resolveActingAsEmail({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: "schoolUidABC",
    activeDocEmail: "student@andrew.cmu.edu",
    userEmail: "me@gmail.com",
  }),
  "student@andrew.cmu.edu",
  "linked session → school email, not personal Gmail"
);

assertEq(
  resolveActingAsEmail({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: null,
    activeDocEmail: null,
    userEmail: "me@gmail.com",
  }),
  null,
  "acting as but school email missing → null (never personal Gmail)"
);

assertEq(
  resolveActingAsEmail({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: "schoolUidABC",
    activeDocEmail: "me@gmail.com",
    userEmail: "me@gmail.com",
  }),
  null,
  "guard: active email === personal Gmail → unresolved"
);

assert(
  shouldShowActingAsChip({
    personalAccount: true,
    linkedTo: "schoolUidABC",
    schoolUidClaim: "schoolUidABC",
    activeDocEmail: "student@andrew.cmu.edu",
    userEmail: "me@gmail.com",
  }),
  "chip visible for linked personal with school email"
);

assert(
  !shouldShowActingAsChip({
    personalAccount: false,
    linkedTo: null,
    schoolUidClaim: null,
    activeDocEmail: "student@andrew.cmu.edu",
    userEmail: "student@andrew.cmu.edu",
  }),
  "chip hidden for non-linked org login"
);

assertEq(
  actingAsLabel("student@andrew.cmu.edu"),
  "Acting as student@andrew.cmu.edu",
  "label format"
);
assertEq(actingAsLabel(null), null, "label null when no email");
assertEq(actingAsLabel("  "), null, "label null when blank");

console.log("\n--- done ---\n");
if (failed) {
  console.error(`${failed} assertion(s) failed`);
  process.exit(1);
}
console.log("All assertions passed.");
