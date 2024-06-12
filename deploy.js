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

function centerMsg(opt, message) {
  const width = process.stdout.columns;
  if (message.length > width) {
    message = message.slice(0, width - 3) + "...";
  }
  const spaces = " ".repeat(Math.max(Math.floor((width - message.length) / 2), 9));

  console.log(opt, spaces + message);
}

function runCommand(command, tag, message) {
  const width = Math.floor((process.stdout.columns - 10) / 2);
  console.log(
    "\x1b[33m%s\x1b[0m",
    `\n|${"-".repeat(Math.max(width - Math.ceil(tag.length / 2), 0))} START ${tag} ${"-".repeat(
      Math.max(width - Math.floor(tag.length / 2), 0)
    )}|\n`
  );
  centerMsg("\x1b[34m%s\x1b[0m", message);

  execSync(command, { stdio: "inherit" });

  console.log(
    "\x1b[33m%s\x1b[0m",
    `\n|${"-".repeat(Math.max(width + 1 - Math.ceil(tag.length / 2), 0))} END ${tag} ${"-".repeat(
      Math.max(width + 1 - Math.floor(tag.length / 2), 0)
    )}|\n`
  );
}

function deploy() {
  // if this is a fork, pull the upstream
  const hasUpstream = execSync("git remote -v").toString().includes("upstream");
  if (hasUpstream) {
    runCommand("git pull upstream main", "pull", "Pulling upstream");
    runCommand("git push origin main", "push", "Pushing to origin");
  } else {
    // create the documentation
    runCommand(
      "rm -r -f public/docs && jsdoc -c jsdoc.config",
      "build docs",
      "Deleting previous & building new JSDocs"
    );
  }

  runCommand(
    `vue-cli-service build${mode ? ` --mode ${mode}` : ""}`,
    "build",
    `Building "${env.parsed.VUE_APP_BRAND_NAME_LONG}" (${env.parsed.VUE_APP_BRAND_NAME_SHORT})`
  );

  runCommand("npm run postbuild", "postbuild", "Running postbuild script");

  const domain = env.parsed.VUE_APP_BRAND_DOMAIN;
  runCommand(`echo ${domain} > ./dist/CNAME`, "domain", `Writing domain ${domain} to CNAME`);

  runCommand("npm run publish", "publish", "Publishing to remote gh-pages branch");
  centerMsg("\n\x1b[32m%s\x1b[0m", "[ finished deploying ]\n\n");
}

deploy();
