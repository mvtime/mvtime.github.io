/**
 * Unit tests for repeating edit-scope matching + toast copy.
 * Run: node --experimental-strip-types scripts/test-repeating-scope.mjs
 */
import {
  matchesRepeatingInstance,
  repeatingArchiveToast,
  repeatingUpdateToast,
  shouldTouchRepeatingTask,
} from "../src/common/repeatingScope.ts";

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

const org = "mvla.net";
const group = "rep-group-1";
const preferredRef = "classA~task1";
const matchOpts = {
  preferredRef,
  classId: "classA",
  taskId: "task1",
  task_date: "2026-03-10",
  orgDomain: org,
};

const target = { ref: "classA/task1", date: "2026-03-10", repetition_group_id: group };
const sibling = { ref: "classA/task2", date: "2026-03-17", repetition_group_id: group };
const otherSeries = { ref: "classA/task9", date: "2026-03-10", repetition_group_id: "other" };
const pastSibling = { ref: "classA/task0", date: "2026-03-03", repetition_group_id: group };

console.log("--- matchesRepeatingInstance ---\n");

assert(matchesRepeatingInstance(target, matchOpts), "match flat classId/taskId ref");
assert(
  matchesRepeatingInstance({ ref: "classA~task1", date: "2026-03-17" }, matchOpts),
  "match short share ref even if date differs"
);
assert(matchesRepeatingInstance({ ref: "other", date: "2026-03-10" }, matchOpts), "match by date fallback");
assert(!matchesRepeatingInstance(sibling, matchOpts), "sibling different id+date does not match");

console.log("\n--- shouldTouchRepeatingTask scope this ---\n");

assert(
  shouldTouchRepeatingTask(target, group, "this", matchOpts),
  "this: touches matching instance"
);
assert(
  !shouldTouchRepeatingTask(sibling, group, "this", matchOpts),
  "this: does not touch sibling in same series"
);
assert(
  !shouldTouchRepeatingTask(otherSeries, group, "this", matchOpts),
  "this: does not touch other series"
);

console.log("\n--- shouldTouchRepeatingTask scope future / all ---\n");

const futureOpts = { ...matchOpts, referenceDate: new Date("2026-03-10T00:00:00") };
assert(
  shouldTouchRepeatingTask(target, group, "future", futureOpts),
  "future: touches on-or-after reference"
);
assert(
  shouldTouchRepeatingTask(sibling, group, "future", futureOpts),
  "future: touches later sibling"
);
assert(
  !shouldTouchRepeatingTask(pastSibling, group, "future", futureOpts),
  "future: skips earlier sibling"
);
assert(
  shouldTouchRepeatingTask(pastSibling, group, "all", futureOpts),
  "all: touches earlier sibling"
);
assert(
  !shouldTouchRepeatingTask(otherSeries, group, "all", futureOpts),
  "all: skips other series"
);

console.log("\n--- toast copy ---\n");

assertEq(repeatingUpdateToast("this", 1), "Updated this task", "update toast singular this");
assertEq(repeatingUpdateToast("this", 2), "Updated 2 tasks in series", "update toast this count!=1");
assertEq(repeatingUpdateToast("future", 1), "Updated 1 tasks in series", "update toast future keeps count");
assertEq(repeatingUpdateToast("all", 5), "Updated 5 tasks in series", "update toast all");
assertEq(repeatingArchiveToast("this", 1), "Archived this task", "archive toast singular this");
assertEq(repeatingArchiveToast("all", 3), "Archived 3 tasks in series", "archive toast all");

console.log("");
if (failed) {
  console.error(`${failed} failing assertion(s)`);
  process.exit(1);
}
console.log("all repeating-scope tests passed");
