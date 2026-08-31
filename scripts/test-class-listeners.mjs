/**
 * Unit tests for class-listener enrollment helpers (pure set compare + race stamps).
 * Run: node --experimental-strip-types scripts/test-class-listeners.mjs
 */
import {
  enrollmentSetsEqual,
  finishedSetsEqual,
  noteClassHydrateTime,
  hydrateBeatsLive,
  clearClassListenerState,
} from "../src/common/classListenerState.ts";

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
  } else {
    console.log("ok:", msg);
  }
}

console.log("--- class listener helper tests ---\n");

assert(enrollmentSetsEqual(null, null), "null enrollment equals null");
assert(enrollmentSetsEqual([], []), "empty enrollment equals empty");
assert(enrollmentSetsEqual(["a/b"], ["a/b"]), "same single enrollment");
assert(enrollmentSetsEqual(["a/b", "c/d"], ["c/d", "a/b"]), "enrollment order-independent");
assert(!enrollmentSetsEqual(["a/b"], ["a/b", "c/d"]), "enrollment size mismatch");
assert(!enrollmentSetsEqual(["a/b"], ["a/x"]), "enrollment path mismatch");

assert(finishedSetsEqual(["t1", "t2"], ["t2", "t1"]), "finished order-independent");
assert(!finishedSetsEqual(["t1"], []), "finished cleared detects change");

clearClassListenerState();
assert(hydrateBeatsLive("a/b", 100), "hydrate ok when no live stamp");
noteClassHydrateTime("a/b", 100);
assert(hydrateBeatsLive("a/b", 100), "equal hydrate still ok (snapshot-or-hydrate tie)");
assert(hydrateBeatsLive("a/b", 200), "newer hydrate ok");
noteClassHydrateTime("a/b", 200);
assert(!hydrateBeatsLive("a/b", 150), "older hydrate loses to live/newer stamp");
assert(hydrateBeatsLive("a/b", 200), "equal to live stamp still applies");

clearClassListenerState();

if (failed) {
  console.error(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");
