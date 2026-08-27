/**
 * Node test for class-square grapheme helpers.
 * Run: node --experimental-strip-types scripts/test-grapheme.mjs
 * (imports ../src/common/grapheme.ts)
 */
import {
  firstGrapheme,
  splitLeadingEmoji,
  classSquareGlyph,
  classTextName,
} from "../src/common/grapheme.ts";

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
    console.log(`ok: ${label} → ${JSON.stringify(actual)}`);
  }
}

console.log("--- class square grapheme tests ---\n");

// Prove name[0] is broken for emoji (surrogate)
{
  const name = "😬 ";
  assert(name[0] !== "😬", `name[0] on "😬 " is NOT the full glyph (got ${JSON.stringify(name[0])})`);
  assertEq(firstGrapheme(name), "😬", 'firstGrapheme("😬 ")');
}

// "😬 " → glyph 😬, rest empty; class_text keeps original when strip leaves empty
{
  const { emoji, rest } = splitLeadingEmoji("😬 ");
  assertEq(emoji, "😬", 'splitLeadingEmoji("😬 ").emoji');
  assertEq(rest, "", 'splitLeadingEmoji("😬 ").rest');
  assertEq(classSquareGlyph({ name: "😬 " }), "😬", 'classSquareGlyph("😬 ")');
  assertEq(classTextName("😬 "), "😬 ", 'classTextName("😬 ") keeps original when empty');
}

// "😬 Homework" → glyph 😬, rest "Homework"
{
  const { emoji, rest } = splitLeadingEmoji("😬 Homework");
  assertEq(emoji, "😬", 'splitLeadingEmoji("😬 Homework").emoji');
  assertEq(rest, "Homework", 'splitLeadingEmoji("😬 Homework").rest');
  assertEq(classSquareGlyph({ name: "😬 Homework" }), "😬", 'classSquareGlyph("😬 Homework")');
  assertEq(classTextName("😬 Homework"), "Homework", 'classTextName("😬 Homework")');
}

// ZWJ family — full grapheme, not a half
{
  const name = "👨‍👩‍👧‍👦 Class";
  const glyph = classSquareGlyph({ name });
  assertEq(glyph, "👨‍👩‍👧‍👦", "family ZWJ glyph");
  assert(glyph !== name[0] && glyph.length > 2, "family glyph is not UTF-16 [0]");
  assertEq(classTextName(name), "Class", "family rest");
}

// Flag
{
  const name = "🇺🇸 Flag";
  assertEq(classSquareGlyph({ name }), "🇺🇸", "flag grapheme");
  assertEq(classTextName(name), "Flag", "flag rest");
}

// Keycap
{
  const name = "1️⃣ Key";
  assertEq(classSquareGlyph({ name }), "1️⃣", "keycap 1");
  assertEq(classTextName(name), "Key", "keycap rest");
}

// Skin tone
{
  const name = "👍🏽 ok";
  assertEq(classSquareGlyph({ name }), "👍🏽", "thumbs up medium skin");
  assertEq(classTextName(name), "ok", "skin tone rest");
}

// period 3, name Biology → glyph "3"
{
  assertEq(classSquareGlyph({ period: 3, name: "Biology" }), "3", "period wins when no emoji");
}

// period 3, name "😬 Bio" → glyph 😬 (emoji wins)
{
  assertEq(classSquareGlyph({ period: 3, name: "😬 Bio" }), "😬", "emoji wins over period");
  assertEq(classTextName("😬 Bio"), "Bio", "emoji strip with period class");
}

// école → é
{
  assertEq(classSquareGlyph({ name: "école" }), "é", 'first grapheme of "école"');
}

// A → A
{
  assertEq(classSquareGlyph({ name: "A" }), "A", 'glyph "A"');
}

console.log("\n--- done ---");
if (failed) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log("\nAll assertions passed.");
