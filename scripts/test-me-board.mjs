/**
 * Unit tests for GET /api/v1/me/board parse + Vue ClassInfo mapping.
 * Run: node --experimental-strip-types scripts/test-me-board.mjs
 */
import {
  classIdFromBoardClass,
  enrollmentKeyForClassId,
  mapMeBoardToClassInfos,
  parseMeBoardResponse,
  teacherEmailFromBoardClass,
} from "../src/common/meBoard.ts";
import { flatTaskPath } from "../src/common/paths.ts";

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

const org = "mvla.net";

console.log("--- me/board parse + map tests ---\n");

assertEq(parseMeBoardResponse(undefined, org), { classes: [], tasks: [], finished: [] }, "204/undefined → empty envelope");
assertEq(parseMeBoardResponse(null, org), { classes: [], tasks: [], finished: [] }, "null → empty envelope");
assertEq(parseMeBoardResponse({}, org), { classes: [], tasks: [], finished: [] }, "empty object → empty arrays");
assertEq(
  parseMeBoardResponse({ classes: [], tasks: [], finished: [] }, org),
  { classes: [], tasks: [], finished: [] },
  "explicit empty board"
);

const raw = {
  classes: [
    {
      id: "c1",
      ref: "c1",
      name: "Chem",
      period: 2,
      color: "#abc",
      owner_email: "teacher@mvla.net",
      teachers: [{ email: "teacher@mvla.net", name: "T", role: "owner" }],
      tasks: [{ ref: "c1/t1", name: "HW", date: "2026-09-01", type: "task" }],
    },
    {
      id: "c2",
      ref: "other@mvla.net/c2",
      name: "Bio",
      period: null,
      color: "#def",
      tasks: [],
    },
    {
      id: "old",
      name: "Archived",
      archived: true,
      tasks: [{ id: "x" }],
    },
  ],
  tasks: [
    {
      id: "t1",
      path: "c1/t1",
      ref: "teacher~c1~t1",
      class_id: "c1",
      class_name: "P2 - Chem",
      date: "2026-09-01",
      completed: true,
      repetition_group_id: null,
      name: "HW",
      type: "task",
    },
    {
      id: "a",
      path: "c2/a",
      ref: "other~c2~a",
      class_id: "c2",
      date: "2026-09-03",
      completed: false,
      repetition_group_id: "rg1",
      name: "Lab",
      type: "task",
    },
  ],
  finished: ["c1/t1", "teacher@mvla.net/c1/t1"],
};

const parsed = parseMeBoardResponse(raw, org);
assert(parsed.classes.length === 2, "archived class dropped from parse");
assert(parsed.classes[0].id === "c1", "bare class id");
assert(parsed.classes[0].tasks[0].ref === "c1/t1", "embedded slash task ref");
assert(parsed.tasks[0].class_id === "c1", "flat class_id");
assert(parsed.tasks[0].path === "c1/t1", "flat path");
assert(parsed.tasks[0].completed === true, "completed flag");
assertEq(parsed.finished, ["c1/t1", "teacher@mvla.net/c1/t1"], "finished raw array");

assertEq(enrollmentKeyForClassId(["teacher@mvla.net/c1", "c2"], "c1"), "teacher@mvla.net/c1", "prefer enrollment key");
assertEq(enrollmentKeyForClassId(["c1"], "c1"), "c1", "bare enrollment matches");
assertEq(enrollmentKeyForClassId([], "solo"), "solo", "no enrollment → bare classId");

assertEq(classIdFromBoardClass({ id: "c1" }, org), "c1", "classId from bare id");
assertEq(classIdFromBoardClass({ id: "t@mvla.net/abc" }, org), "abc", "classId from legacy email/classId");
assertEq(teacherEmailFromBoardClass({ owner_email: "teacher@mvla.net" }), "teacher@mvla.net", "owner_email");
assert(
  teacherEmailFromBoardClass({ owner_email: "canvas.import@mvla.net", teachers: [{ email: "real@mvla.net" }] }) ===
    "real@mvla.net",
  "skip canvas.import owner, use teachers[]"
);

const mapped = mapMeBoardToClassInfos(parsed, ["teacher@mvla.net/c1", "c2"], org);
assert(mapped.length === 2, "mapped two live classes");
assert(mapped[0].id === "teacher@mvla.net/c1", "id prefers enrollment key");
assert(mapped[0]._class_id === "c1", "_class_id is bare classId");
assert(mapped[0].tasks[0].ref === flatTaskPath("c1", "t1"), "writer task ref classId/taskId");
assert(!mapped[0].tasks[0].id, "task id stripped");
assert(mapped[0].period === 2, "period preserved");
assert(mapped[0].name === "Chem", "name preserved");
assert(mapped[0].teachers, "teachers preserved");

assert(mapped[1].id === "c2", "bare enrollment id");
assert(mapped[1]._class_id === "c2", "c2 _class_id");
assert(mapped[1].tasks.length === 1, "top-level tasks fill empty embedded tasks[]");
assert(mapped[1].tasks[0].ref === "c2/a", "merged task flat ref");
assert(mapped[1].tasks[0].repetition_group_id === "rg1", "repetition_group_id kept");
assert(!String(mapped[1].tasks[0].ref).includes("@"), "merged task ref is not nested email path");
assert(!String(mapped[0].id).includes("@") || mapped[0].id.endsWith("/c1"), "enrollment key may be legacy email/classId");
assert(!String(mapped[0]._class_id).includes("@"), "primary _class_id never nested");

assert(mapped[0].period === 2 && mapped[1].period == null, "period-bearing class sorts first");

const emptyMapped = mapMeBoardToClassInfos({ classes: [], tasks: [], finished: [] }, [], org);
assertEq(emptyMapped, [], "empty board → empty ClassInfo[]");

const noId = parseMeBoardResponse(
  {
    classes: [{ name: "Nope", tasks: [] }],
    tasks: [{ name: "orphan" }],
    finished: [1, "ok"],
  },
  org
);
assert(noId.classes.length === 0, "class without id skipped");
assert(noId.tasks.length === 0, "task without class_id skipped");
assertEq(noId.finished, ["ok"], "non-string finished dropped");

if (failed) {
  console.error(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nall passed");
