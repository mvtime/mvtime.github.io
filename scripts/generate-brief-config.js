#!/usr/bin/env node
/**
 * Generate public/.well-known/brief.json from env (single source of truth).
 *
 * Priority:
 *   1. If BRIEF_FETCH_CONFIG=1 — fetch BRIEF_CONFIG_URL (production cmutt:
 *      https://api.cmutt.app/api/v1/client-config). Server .env is the only
 *      place humans edit brochure values; Pages copies the live API response.
 *   2. BRIEF_CLIENT_CONFIG — full JSON blob (same schema as API client-config)
 *   3. Compose from discrete BRIEF_* / VUE_APP_* / FIREBASE_* vars
 *      (offline CI / .env.test / forks)
 *   4. Minimal stub so offline CI still builds
 *
 * Never put service accounts or server secrets here — Firebase web/iOS client
 * fields are intentionally public. Never commit a hand-edited production
 * brief.json.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "public", ".well-known", "brief.json");

const DEFAULT_FETCH_URL = "https://api.cmutt.app/api/v1/client-config";

/** Parse a simple KEY=VALUE .env file (no export, no multiline values). */
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const raw of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

/**
 * Load Vue-CLI-style env files for a mode without overwriting existing process.env.
 * Order (lowest → highest precedence among files): .env, .env.local, .env.[mode], .env.[mode].local
 * Existing process.env wins over all files.
 */
function loadEnvFiles(mode) {
  const names = [".env", ".env.local"];
  if (mode && mode !== "development") {
    names.push(`.env.${mode}`, `.env.${mode}.local`);
  } else if (mode === "development") {
    names.push(".env.development", ".env.development.local");
  } else {
    // production default when no mode (matches vue-cli-service build)
    names.push(".env.production", ".env.production.local");
  }

  const merged = {};
  for (const name of names) {
    Object.assign(merged, parseEnvFile(path.join(ROOT, name)));
  }
  for (const [key, value] of Object.entries(merged)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function argMode() {
  const idx = process.argv.indexOf("--mode");
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  // npm run build -- --mode test → vue-cli gets it; prebuild may see npm_config_argv
  const fromEnv = process.env.VUE_CLI_MODE || process.env.npm_config_mode;
  if (fromEnv) return fromEnv;
  // CI copies .env.test → .env; treat as production build mode for file loading
  return process.env.NODE_ENV === "development" ? "development" : "production";
}

function withHash(color) {
  if (!color) return undefined;
  return color.startsWith("#") ? color : `#${color}`;
}

function apiBaseFromEnv() {
  if (process.env.BRIEF_API_BASE) return process.env.BRIEF_API_BASE.replace(/\/$/, "");
  const host = process.env.VUE_APP_BRAND_DOMAIN__API;
  if (host) return `https://${host.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return undefined;
}

function composeFromDiscrete() {
  const name =
    process.env.BRIEF_NAME ||
    process.env.VUE_APP_BRAND_NAME_SHORT ||
    process.env.VUE_APP_BRAND_NAME_LONG;
  const apiBase = apiBaseFromEnv();
  const brandColor =
    withHash(process.env.BRIEF_BRAND_COLOR) || withHash(process.env.VUE_APP_THEME_COLOR);

  const firebase = {
    apiKey: process.env.BRIEF_FIREBASE_API_KEY || process.env.FIREBASE_apiKey || null,
    projectId: process.env.BRIEF_FIREBASE_PROJECT_ID || process.env.FIREBASE_projectId || null,
    // iOS Brief appId — do NOT reuse web FIREBASE_appId
    appId: process.env.BRIEF_FIREBASE_APP_ID || null,
    gcmSenderId:
      process.env.BRIEF_FIREBASE_GCM_SENDER_ID ||
      process.env.FIREBASE_messagingSenderId ||
      null,
    clientId: process.env.BRIEF_FIREBASE_CLIENT_ID || null,
    reversedClientId: process.env.BRIEF_FIREBASE_REVERSED_CLIENT_ID || null,
    storageBucket:
      process.env.BRIEF_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_storageBucket || null,
    databaseURL:
      process.env.BRIEF_FIREBASE_DATABASE_URL === undefined
        ? null
        : process.env.BRIEF_FIREBASE_DATABASE_URL || null,
    authDomain: process.env.BRIEF_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_authDomain || null,
  };

  if (!name && !apiBase && !Object.values(firebase).some((v) => v != null && v !== "")) {
    return null;
  }

  return {
    name: name || "Task Tracker",
    apiBase: apiBase || "",
    brandColor: brandColor || "#000000",
    firebase,
  };
}

function minimalStub() {
  return {
    name: process.env.VUE_APP_BRAND_NAME_SHORT || "Task Tracker",
    apiBase: apiBaseFromEnv() || "",
    brandColor: withHash(process.env.VUE_APP_THEME_COLOR) || "#000000",
    firebase: {
      apiKey: process.env.FIREBASE_apiKey || null,
      projectId: process.env.FIREBASE_projectId || null,
      appId: null,
      gcmSenderId: process.env.FIREBASE_messagingSenderId || null,
      clientId: null,
      reversedClientId: null,
      storageBucket: process.env.FIREBASE_storageBucket || null,
      databaseURL: null,
      authDomain: process.env.FIREBASE_authDomain || null,
    },
  };
}

function parseClientConfigBlob() {
  const raw = process.env.BRIEF_CLIENT_CONFIG;
  if (!raw || !raw.trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("BRIEF_CLIENT_CONFIG must be a JSON object");
    }
    return parsed;
  } catch (err) {
    console.error(`[generate-brief-config] Invalid BRIEF_CLIENT_CONFIG: ${err.message}`);
    process.exit(1);
  }
}

async function fetchRemoteConfig() {
  const url = process.env.BRIEF_CONFIG_URL || DEFAULT_FETCH_URL;
  console.log(`[generate-brief-config] Fetching ${url}`);
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}`);
  }
  return res.json();
}

function writeConfig(config) {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  console.log(`[generate-brief-config] Wrote ${path.relative(ROOT, OUT_PATH)}`);
}

function wantFetch() {
  return process.env.BRIEF_FETCH_CONFIG === "1" || process.env.BRIEF_FETCH_CONFIG === "true";
}

async function main() {
  const mode = argMode();
  loadEnvFiles(mode);

  let config = null;
  let source = null;

  // Production cmutt: prefer live API so server .env is the only human SSOT.
  if (wantFetch()) {
    try {
      config = await fetchRemoteConfig();
      source = "remote fetch (BRIEF_FETCH_CONFIG)";
    } catch (err) {
      console.warn(`[generate-brief-config] Fetch failed: ${err.message}`);
    }
  }

  if (!config) {
    config = parseClientConfigBlob();
    if (config) source = "BRIEF_CLIENT_CONFIG";
  }

  if (!config) {
    config = composeFromDiscrete();
    if (config) {
      source = wantFetch()
        ? "env compose (fetch failed; BRIEF_* / VUE_APP_* / FIREBASE_*)"
        : "env compose (BRIEF_* / VUE_APP_* / FIREBASE_*)";
    }
  }

  if (!config) {
    config = minimalStub();
    source = wantFetch() ? "minimal stub (fetch failed)" : "minimal stub";
  }

  writeConfig(config);
  console.log(`[generate-brief-config] Source: ${source}`);
}

main().catch((err) => {
  console.error(`[generate-brief-config] ${err.stack || err}`);
  process.exit(1);
});
