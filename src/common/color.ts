/**
 * Pure color helpers for class-name chips.
 * Mixes class accent color against flat page `--color-bg` (opaque) and picks
 * a readable foreground. No Vue/DOM required — safe for Node unit tests.
 * @file common/color.ts
 */

/** Flat page backgrounds matching `base.css` light / dark `--color-bg`. */
export const PAGE_BG_LIGHT = "#ffffff";
export const PAGE_BG_DARK = "#1c1c1c";

/**
 * Alpha previously encoded as hex suffix `2d` (`color + '2d'`).
 * Used when mixing class color over page bg so chips stay visually close.
 */
export const CLASS_CHIP_MIX_ALPHA = 0x2d / 255;

/** WCAG AA normal-text contrast target. */
export const CONTRAST_TARGET = 4.5;

export type ThemeBgFlag = "light" | "dark" | boolean;

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Clamp to 0–255 integer channel. */
function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

/**
 * Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` (alpha ignored) into RGB.
 * Returns null if the string is not a usable hex color.
 */
export function parseHex(hex: string): Rgb | null {
  if (hex == null) return null;
  let s = String(hex).trim();
  if (s.startsWith("#")) s = s.slice(1);
  if (/^[0-9a-fA-F]{3}$/.test(s)) {
    return {
      r: parseInt(s[0] + s[0], 16),
      g: parseInt(s[1] + s[1], 16),
      b: parseInt(s[2] + s[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(s) || /^[0-9a-fA-F]{8}$/.test(s)) {
    return {
      r: parseInt(s.slice(0, 2), 16),
      g: parseInt(s.slice(2, 4), 16),
      b: parseInt(s.slice(4, 6), 16),
    };
  }
  return null;
}

/** Format RGB as lowercase `#rrggbb`. */
export function rgbToHex({ r, g, b }: Rgb): string {
  const h = (n: number) => clampByte(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/**
 * Resolve page background hex from an explicit hex, or a light/dark flag.
 * `true` / `"dark"` → dark; `false` / `"light"` → light.
 */
export function resolvePageBg(bgOrFlag: string | ThemeBgFlag): string {
  if (typeof bgOrFlag === "boolean") {
    return bgOrFlag ? PAGE_BG_DARK : PAGE_BG_LIGHT;
  }
  const flag = String(bgOrFlag).trim().toLowerCase();
  if (flag === "dark") return PAGE_BG_DARK;
  if (flag === "light") return PAGE_BG_LIGHT;
  const parsed = parseHex(flag.startsWith("#") ? flag : `#${flag}`);
  return parsed ? rgbToHex(parsed) : PAGE_BG_LIGHT;
}

/**
 * Mix `foreground` over `background` with opacity `alpha` (0–1).
 * Result is opaque RGB (same visual as translucent fg on flat bg).
 */
export function mixRgb(foreground: Rgb, background: Rgb, alpha: number): Rgb {
  const a = Math.max(0, Math.min(1, alpha));
  return {
    r: clampByte(foreground.r * a + background.r * (1 - a)),
    g: clampByte(foreground.g * a + background.g * (1 - a)),
    b: clampByte(foreground.b * a + background.b * (1 - a)),
  };
}

/**
 * Mix class color hex against page background into an opaque chip background.
 * Replaces the old `color + '2d'` translucent approach.
 *
 * @param classColorHex Class accent (e.g. `#45818e`)
 * @param pageBgHexOrFlag Page `--color-bg` hex, or `"light"` / `"dark"` / boolean
 * @param alpha Mix weight for class color (default matches legacy `2d`)
 */
export function mixClassChipBackground(
  classColorHex: string,
  pageBgHexOrFlag: string | ThemeBgFlag = "light",
  alpha: number = CLASS_CHIP_MIX_ALPHA,
): string {
  const fg = parseHex(classColorHex);
  const bg = parseHex(resolvePageBg(pageBgHexOrFlag));
  if (!fg || !bg) {
    return rgbToHex(bg || { r: 255, g: 255, b: 255 });
  }
  return rgbToHex(mixRgb(fg, bg, alpha));
}

/** sRGB channel → linear for relative luminance (WCAG). */
function srgbChannelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance 0–1 (WCAG 2.x). */
export function relativeLuminance(rgb: Rgb): number {
  const R = srgbChannelToLinear(rgb.r);
  const G = srgbChannelToLinear(rgb.g);
  const B = srgbChannelToLinear(rgb.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** WCAG contrast ratio between two colors (≥ 1). */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const L1 = relativeLuminance(a);
  const L2 = relativeLuminance(b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Linear interpolate RGB toward `toward` by `t` in [0, 1]. */
function lerpRgb(from: Rgb, toward: Rgb, t: number): Rgb {
  return {
    r: clampByte(from.r + (toward.r - from.r) * t),
    g: clampByte(from.g + (toward.g - from.g) * t),
    b: clampByte(from.b + (toward.b - from.b) * t),
  };
}

/**
 * Search along a lerp path from `base` toward `target` for best contrast vs `bg`.
 * Prefers the first sample meeting `minRatio`; otherwise returns the best found.
 */
function bestAlongPath(
  base: Rgb,
  target: Rgb,
  bg: Rgb,
  minRatio: number,
  steps: number = 24,
): { color: Rgb; ratio: number } {
  let best = { color: base, ratio: contrastRatio(base, bg) };
  if (best.ratio >= minRatio) return best;
  for (let i = 1; i <= steps; i++) {
    const candidate = lerpRgb(base, target, i / steps);
    const ratio = contrastRatio(candidate, bg);
    if (ratio > best.ratio) {
      best = { color: candidate, ratio };
    }
    if (ratio >= minRatio) {
      return { color: candidate, ratio };
    }
  }
  return best;
}

/**
 * Pick a readable text/fg color against a mixed chip background.
 * Tries the class color first; if contrast is below target, darkens or lightens
 * toward black/white to approach WCAG ~4.5:1 for normal text when possible.
 *
 * @param classColorHex Class accent hex
 * @param mixedBgHex Opaque chip background (from {@link mixClassChipBackground})
 * @param minRatio Contrast target (default 4.5)
 */
export function readableTextOnBackground(
  classColorHex: string,
  mixedBgHex: string,
  minRatio: number = CONTRAST_TARGET,
): string {
  const classRgb = parseHex(classColorHex);
  const bgRgb = parseHex(mixedBgHex);
  if (!bgRgb) return classColorHex || "#000000";
  if (!classRgb) {
    // Fall back to black or white by bg luminance
    return relativeLuminance(bgRgb) > 0.179 ? "#000000" : "#ffffff";
  }

  const baseRatio = contrastRatio(classRgb, bgRgb);
  if (baseRatio >= minRatio) {
    return rgbToHex(classRgb);
  }

  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  const towardDark = bestAlongPath(classRgb, black, bgRgb, minRatio);
  const towardLight = bestAlongPath(classRgb, white, bgRgb, minRatio);

  // Prefer a result that meets the target; otherwise the higher ratio.
  // If both meet (or neither), prefer the path that stays closer to the class hue
  // by choosing the better ratio, breaking ties toward darkening on light bgs.
  const bgLum = relativeLuminance(bgRgb);
  let chosen: { color: Rgb; ratio: number };
  if (towardDark.ratio >= minRatio && towardLight.ratio >= minRatio) {
    chosen = bgLum > 0.179 ? towardDark : towardLight;
  } else if (towardDark.ratio >= minRatio) {
    chosen = towardDark;
  } else if (towardLight.ratio >= minRatio) {
    chosen = towardLight;
  } else {
    chosen = towardDark.ratio >= towardLight.ratio ? towardDark : towardLight;
  }

  // If adjusting away from class color still loses to pure black/white, use those.
  const pureDark = { color: black, ratio: contrastRatio(black, bgRgb) };
  const pureLight = { color: white, ratio: contrastRatio(white, bgRgb) };
  if (chosen.ratio < minRatio) {
    const pure = pureDark.ratio >= pureLight.ratio ? pureDark : pureLight;
    if (pure.ratio > chosen.ratio) chosen = pure;
  }

  return rgbToHex(chosen.color);
}

/**
 * Convenience: opaque chip bg + readable fg for a class color on a page bg.
 */
export function classChipColors(
  classColorHex: string,
  pageBgHexOrFlag: string | ThemeBgFlag = "light",
  alpha: number = CLASS_CHIP_MIX_ALPHA,
  minRatio: number = CONTRAST_TARGET,
): { background: string; foreground: string; classColor: string } {
  const classColor = parseHex(classColorHex)
    ? rgbToHex(parseHex(classColorHex) as Rgb)
    : String(classColorHex || "#000000");
  const background = mixClassChipBackground(classColorHex, pageBgHexOrFlag, alpha);
  const foreground = readableTextOnBackground(classColor, background, minRatio);
  return { background, foreground, classColor };
}
