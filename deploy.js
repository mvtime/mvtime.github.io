// deploy.js
// deploys to the mode specified in the command line
// - given as "npm run deploy [mode]"
// - check that an env file exists for the mode (.env.[mode])
// - run build w/ -- --mode=[mode]
// - echo [mode env's file domain] > ./dist/CNAME
// - run publish

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

console.log(
  `\nBuilding "${env.parsed.VUE_APP_BRAND_LONG_NAME}" (${env.parsed.VUE_APP_BRAND_SHORT_NAME})`
);
execSync(`npm run build -- --mode=${mode}`, { stdio: "inherit" });

const domain = env.parsed.VUE_APP_BRAND_DOMAIN;
console.log(`Writing domain ${domain} to CNAME`);
fs.writeFileSync(path.resolve(__dirname, "dist/CNAME"), domain);

console.log("\nPublishing");
execSync("npm run publish", { stdio: "inherit" });
console.log("\nFinished Deploy");
