const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const mode = process.argv[2];

if (!mode) {
  console.log("No mode specified; will deploy to production");
}

console.log(`\nAttempting to deploy to "${mode ? mode : "production"}"`);
const public_env_file = path.resolve(__dirname, mode ? `.env.${mode}` : ".env");
const local_env_file = path.resolve(__dirname, mode ? `.env.${mode}.local` : ".env.local");

const env_file = fs.existsSync(local_env_file) ? local_env_file : public_env_file;

if (!fs.existsSync(env_file)) {
  console.error(`No env file found for ${mode ? mode : "production"}`);
  process.exit(1);
}

// load with dotenv
const env = require("dotenv").config({ path: env_file });

function runCommand(command, message) {
  console.log(message);
  execSync(command, { stdio: "inherit" });
}

function deploy() {
  // if this is a fork, pull the upstream
  const hasUpstream = execSync("git remote -v").toString().includes("upstream");
  if (hasUpstream) {
    runCommand("git pull upstream main", "Pulling upstream");
  }

  runCommand(
    `npm run build${mode ? ` -- --mode ${mode}` : ""}`,
    `\nBuilding "${env.parsed.VUE_APP_BRAND_LONG_NAME}" (${env.parsed.VUE_APP_BRAND_SHORT_NAME})`
  );

  const domain = env.parsed.VUE_APP_BRAND_DOMAIN;
  runCommand(`echo ${domain} > ./dist/CNAME`, `Writing domain ${domain} to CNAME`);

  runCommand("npm run publish", "\nPublishing");
  console.log("\nFinished Deploy");
}

deploy();
