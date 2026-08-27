/**
 * Unicode grapheme helpers for class-square glyphs.
 * No window/Vue dependencies — safe to import from Node tests.
 * @file common/grapheme.ts
 */

/** Approximate grapheme clusters when Intl.Segmenter is unavailable. */
const GRAPHEME_FALLBACK =
  /(?:\p{Regional_Indicator}{2})|(?:\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?)*)|(?:[0-9#*]\uFE0F?\u20E3)|(?:\P{M}\p{M}*|[\uD800-\uDBFF][\uDC00-\uDFFF]|.)/gu;

/**
 * Split a string into grapheme clusters (user-perceived characters).
 * Prefers Intl.Segmenter; falls back to a Unicode-aware regex (never UTF-16 indexing).
 */
export function graphemes(s: string): string[] {
  if (s == null || s === "") return [];
  const str = String(s);
  if (typeof Intl !== "undefined" && typeof (Intl as any).Segmenter === "function") {
    const segmenter = new (Intl as any).Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(str), (seg: { segment: string }) => seg.segment);
  }
  return str.match(GRAPHEME_FALLBACK) || [];
}

/** First grapheme cluster of `s`, or empty string. */
export function firstGrapheme(s: string): string {
  const g = graphemes(s);
  return g.length ? g[0] : "";
}

/**
 * Whether a grapheme is an emoji (pictographic, ZWJ sequence, flag, keycap, etc.).
 * The whole grapheme is treated as one unit even if it contains VS16, ZWJ, or skin tones.
 */
export function isEmojiGrapheme(g: string): boolean {
  if (!g) return false;
  try {
    if (/\p{Extended_Pictographic}/u.test(g)) return true;
    if (/\p{Regional_Indicator}/u.test(g)) return true;
    // keycap sequences: 1️⃣ #️⃣ *️⃣
    if (/\u20E3/.test(g)) return true;
    // emoji presentation selector without other cues
    if (/\uFE0F/.test(g) && /\p{Emoji}/u.test(g)) return true;
    return false;
  } catch {
    // Environments without Unicode property escapes: crude surrogate / ZWJ check
    return /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u200D|\uFE0F|\u20E3/.test(g);
  }
}

/**
 * If `name` starts with an emoji grapheme (optionally followed by a space),
 * return that emoji and the remainder with the leading space stripped.
 * Otherwise `{ emoji: null, rest: name }`.
 */
export function splitLeadingEmoji(name: string): { emoji: string | null; rest: string } {
  if (name == null || name === "") return { emoji: null, rest: name ?? "" };
  const first = firstGrapheme(name);
  if (!isEmojiGrapheme(first)) return { emoji: null, rest: name };
  let rest = name.slice(first.length);
  if (rest.startsWith(" ")) rest = rest.slice(1);
  return { emoji: first, rest };
}

export interface ClassSquareSource {
  name?: string | null;
  period?: number | string | null;
}

/**
 * Glyph for a class square:
 * 1. Leading emoji grapheme (if present) — wins over period
 * 2. Else period when set (including 0)
 * 3. Else first grapheme of the name
 */
export function classSquareGlyph(class_obj: ClassSquareSource | null | undefined): string {
  if (!class_obj) return "";
  const name = class_obj.name ?? "";
  const { emoji } = splitLeadingEmoji(name);
  if (emoji) return emoji;
  if (class_obj.period != null && class_obj.period !== "") {
    return String(class_obj.period);
  }
  return firstGrapheme(name);
}

/**
 * Name to show in class_text lists: strip leading emoji (+ one following space)
 * so the square does not repeat it. If stripping would leave the name empty,
 * keep the original name.
 */
export function classTextName(name: string | null | undefined): string {
  if (name == null) return "";
  const { emoji, rest } = splitLeadingEmoji(name);
  if (emoji == null) return name;
  if (rest.length === 0) return name;
  return rest;
}
