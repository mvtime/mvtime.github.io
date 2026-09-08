/**
 * Unit tests for me/tasks API helpers (patch + board state merge).
 * Run: node --experimental-strip-types scripts/test-me-tasks.mjs
 */
import {
  applyMeTaskState,
  meTaskStateFromBoardTask,
} from "../src/common/meTaskState.ts";

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
    console.log("ok:", label);
  }
}

console.log("--- me/tasks state tests ---\n");

const boardRow = {
  path: "c1/t1",
  ref: "c1/t1",
  completed: true,
  completed_at: "2026-09-01T12:00:00Z",
  note: "study notes",
  note_updated_at: "2026-09-01T11:00:00Z",
  workspace_id: "ws-abc",
};

const fromBoard = meTaskStateFromBoardTask(boardRow, "c1", "t1");
assert(fromBoard.completed === true, "board completed");
assertEq(fromBoard.note, "study notes", "board note");
assertEq(fromBoard.workspace_id, "ws-abc", "board workspace_id");

let map = {};
map = applyMeTaskState(map, fromBoard);
assert(map["c1/t1"]?.note === "study notes", "map by path");
assert(map["c1~t1"]?.workspace_id === "ws-abc", "map by tilde ref alias");

const undone = { ...fromBoard, completed: false, completed_at: null };
map = applyMeTaskState(map, undone);
assert(map["c1/t1"]?.completed === false, "patch completed false");

if (failed) {
  console.error(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");
