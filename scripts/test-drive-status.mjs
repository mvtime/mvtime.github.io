/**
 * Unit tests for Drive account status parsing (mirrors workspace.ts helper).
 * Run: node scripts/test-drive-status.mjs
 */
function parseDriveConnected(payload) {
  if (!payload || typeof payload !== "object") return false;
  const row = payload;
  if (row.connected === true) return true;
  if (row.drive_connected === true) return true;
  const status = typeof row.status === "string" ? row.status.toLowerCase() : "";
  return status === "connected" || status === "ok";
}

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
  } else {
    console.log("ok:", msg);
  }
}

console.log("--- drive status parse tests ---\n");

assert(parseDriveConnected({ connected: true }), "connected: true");
assert(parseDriveConnected({ drive_connected: true }), "drive_connected: true");
assert(parseDriveConnected({ status: "connected" }), 'status: "connected"');
assert(parseDriveConnected({ status: "ok" }), 'status: "ok"');
assert(!parseDriveConnected({ connected: false }), "connected: false");
assert(!parseDriveConnected({ status: "disconnected" }), 'status: "disconnected"');
assert(!parseDriveConnected(null), "null");
assert(!parseDriveConnected(undefined), "undefined");

if (failed) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll drive status tests passed.");
