const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const mode = process.argv[2];

if (!mode) {
  console.error("No mode specified; use 'npm run deploy [mode]'");
  process.exit(1);
}

console.log(`\nAttempting to deploy to "${mode}"`);
const public_env_file = path.resolve(__dirname, `.env.${mode}`);
const local_env_file = path.resolve(__dirname, `.env.${mode}.local`);

const env_file = fs.existsSync(public_env_file) ? public_env_file : local_env_file;

if (!fs.existsSync(env_file)) {
  console.error(`No env file found for "${mode}"`);
  process.exit(1);
}

// load with dotenv
const env = require("dotenv").config({ path: env_file });

function runCommand(command, message) {
  console.log(message);
  execSync(command, { stdio: "inherit" });
}

function deploy() {
  runCommand(
    `npm run build -- --mode=${mode}`,
    `\nBuilding "${env.parsed.VUE_APP_BRAND_LONG_NAME}" (${env.parsed.VUE_APP_BRAND_SHORT_NAME})`
  );

  const domain = env.parsed.VUE_APP_BRAND_DOMAIN;
  runCommand(`echo ${domain} > ./dist/CNAME`, `Writing domain ${domain} to CNAME`);

  runCommand("npm run publish", "\nPublishing");
  console.log("\nFinished Deploy");
}

deploy();
