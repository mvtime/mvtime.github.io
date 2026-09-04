/**
 * Unit tests for class chip color mix / contrast helpers.
 * Run: node --experimental-strip-types scripts/test-color.mjs
 * (imports ../src/common/color.ts)
 */
import {
  parseHex,
  rgbToHex,
  mixRgb,
  mixClassChipBackground,
  readableTextOnBackground,
  contrastRatio,
  relativeLuminance,
  classChipColors,
  resolvePageBg,
  PAGE_BG_LIGHT,
  PAGE_BG_DARK,
  CLASS_CHIP_MIX_ALPHA,
  CONTRAST_TARGET,
} from "../src/common/color.ts";

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
    console.error(
      `FAIL: ${label}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`,
    );
  } else {
    console.log(`ok: ${label} → ${JSON.stringify(actual)}`);
  }
}

function assertClose(actual, expected, eps, label) {
  const ok = Math.abs(actual - expected) <= eps;
  if (!ok) {
    failed++;
    console.error(`FAIL: ${label}\n  expected ≈ ${expected} (±${eps})\n  actual: ${actual}`);
  } else {
    console.log(`ok: ${label} → ${actual}`);
  }
}

console.log("--- color helper tests ---\n");

// parseHex
{
  assertEq(rgbToHex(parseHex("#abc")), "#aabbcc", "parseHex #abc");
  assertEq(rgbToHex(parseHex("45818e")), "#45818e", "parseHex without #");
  assertEq(rgbToHex(parseHex("#45818e2d")), "#45818e", "parseHex ignores alpha suffix");
  assert(parseHex("nope") === null, "parseHex rejects garbage");
}

// resolvePageBg
{
  assertEq(resolvePageBg("light"), PAGE_BG_LIGHT, "resolvePageBg light");
  assertEq(resolvePageBg("dark"), PAGE_BG_DARK, "resolvePageBg dark");
  assertEq(resolvePageBg(false), PAGE_BG_LIGHT, "resolvePageBg false → light");
  assertEq(resolvePageBg(true), PAGE_BG_DARK, "resolvePageBg true → dark");
  assertEq(resolvePageBg("#1c1c1c"), "#1c1c1c", "resolvePageBg hex passthrough");
}

// mix: translucent 2d over white ≈ legacy visual, but opaque
{
  const classRgb = parseHex("#45818e");
  const white = parseHex(PAGE_BG_LIGHT);
  const mixed = mixRgb(classRgb, white, CLASS_CHIP_MIX_ALPHA);
  const expectedR = Math.round(0x45 * CLASS_CHIP_MIX_ALPHA + 255 * (1 - CLASS_CHIP_MIX_ALPHA));
  const expectedG = Math.round(0x81 * CLASS_CHIP_MIX_ALPHA + 255 * (1 - CLASS_CHIP_MIX_ALPHA));
  const expectedB = Math.round(0x8e * CLASS_CHIP_MIX_ALPHA + 255 * (1 - CLASS_CHIP_MIX_ALPHA));
  assertEq(mixed.r, expectedR, "mixRgb R against white");
  assertEq(mixed.g, expectedG, "mixRgb G against white");
  assertEq(mixed.b, expectedB, "mixRgb B against white");

  const hex = mixClassChipBackground("#45818e", "light");
  assertEq(hex, rgbToHex(mixed), "mixClassChipBackground light matches mixRgb");
  assert(!hex.endsWith("2d"), "mixed bg is opaque hex (no 2d alpha suffix)");
  assert(hex.length === 7, "mixed bg is #rrggbb");
}

// dark page bg mix differs from light
{
  const lightBg = mixClassChipBackground("#ff0000", "light");
  const darkBg = mixClassChipBackground("#ff0000", "dark");
  assert(lightBg !== darkBg, "light vs dark page bg produce different mixes");
  assertEq(
    mixClassChipBackground("#ff0000", PAGE_BG_DARK),
    darkBg,
    "explicit dark hex matches dark flag",
  );
}

// luminance / contrast basics
{
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  assertClose(relativeLuminance(black), 0, 1e-6, "luminance black");
  assertClose(relativeLuminance(white), 1, 1e-6, "luminance white");
  assertClose(contrastRatio(black, white), 21, 1e-6, "contrast black/white = 21");
  assertClose(contrastRatio(white, white), 1, 1e-6, "contrast white/white = 1");
}

// readable text: high-contrast class color kept as-is on light mixed chip
{
  const bg = mixClassChipBackground("#0000aa", "light");
  const fg = readableTextOnBackground("#0000aa", bg);
  assertEq(fg, "#0000aa", "keeps class color when contrast is already strong");
  assert(
    contrastRatio(parseHex(fg), parseHex(bg)) >= CONTRAST_TARGET,
    `fg/bg contrast ≥ ${CONTRAST_TARGET}`,
  );
}

// readable text: pale yellow on light mix needs darkening
{
  const pale = "#f5e6a3";
  const bg = mixClassChipBackground(pale, "light");
  const fg = readableTextOnBackground(pale, bg);
  const ratio = contrastRatio(parseHex(fg), parseHex(bg));
  assert(fg !== pale || ratio >= CONTRAST_TARGET, "pale color adjusted or already ok");
  assert(
    ratio >= CONTRAST_TARGET || ratio > contrastRatio(parseHex(pale), parseHex(bg)),
    `adjusted fg improves contrast (got ${ratio.toFixed(2)})`,
  );
  // Prefer meeting AA when possible against near-white chip bg
  assert(ratio >= CONTRAST_TARGET, `pale-on-light reaches ~${CONTRAST_TARGET}:1 (got ${ratio.toFixed(2)})`);
}

// dark theme: light class color on dark mixed bg
{
  const bright = "#a8e6ff";
  const bg = mixClassChipBackground(bright, "dark");
  const fg = readableTextOnBackground(bright, bg);
  const ratio = contrastRatio(parseHex(fg), parseHex(bg));
  assert(ratio >= CONTRAST_TARGET, `bright-on-dark reaches ~${CONTRAST_TARGET}:1 (got ${ratio.toFixed(2)})`);
}

// classChipColors convenience
{
  const { background, foreground, classColor } = classChipColors("#45818e", "light");
  assertEq(classColor, "#45818e", "classChipColors preserves classColor");
  assertEq(background, mixClassChipBackground("#45818e", "light"), "classChipColors bg");
  assertEq(foreground, readableTextOnBackground("#45818e", background), "classChipColors fg");
}

// invalid class color: still returns a usable opaque bg from page
{
  const bg = mixClassChipBackground("not-a-color", "light");
  assertEq(bg, PAGE_BG_LIGHT, "invalid class color → page bg");
}

console.log("\n--- done ---");
if (failed) {
  console.error(`\n${failed} failure(s)`);
  process.exit(1);
}
console.log("\nall passed");
