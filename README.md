## Task Tracker Framework

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

use `npm run serve -- --mode [mode]` to run with alternative `.env.[mode]` or `.env.[mode].local` files. the additional `--` is nessesary to ensure the `--mode` flag gets passed to the `vue-cli-service`

#### Builds and deploys to Github Pages

(builds to the gh-pages branch with the options in `.env.local` or `.env`)

```
nvm use 18 && npm run deploy
```

Production Brief discovery (`/.well-known/brief.json` on `cmutt.app` / `mvtt.app`) is **generated at deploy time** from env — not a hand-edited JSON file. `deploy.js` runs `scripts/generate-brief-config.js` before `vue-cli-service build`, then publishes `dist/` to `gh-pages`. CI `npm run build` also regenerates via `prebuild`, but **live Pages only updates when you run `npm run deploy`** (or otherwise publish that `dist`).

Keep production `BRIEF_*` / `BRIEF_CLIENT_CONFIG` in sync with mvtt-server’s client-config env (same public allowlist). See `example.env` for the field list. Never commit service accounts; Firebase client fields are OK.

or optionally when cmu-tt is side-by-side (requires all changes to be pushed to remote for full parity):

```
nvm use 18 && npm run deploy & (cd ../cmu-tt.github.io && nvm use 18 && npm run deploy) & (cd ../villanova-tt.github.io && nvm use 18 && npm run deploy)
```

#### Builds the [documentation](https://mvtt.app/docs)

```
rm -r -f public/docs && tsc --outDir tmp --rootDir src && jsdoc -c jsdoc.config && rm -r -f tmp
```

#### [To-dos and Feature roadmap](https://mvtt.app/roadmap)

#### Useful links

[Home](https://mvtt.app) ·
[About](https://mvtt.app/about) ·
[Contact](https://mvtt.app/contact) ·
[Documentation](https://mvtt.app/docs)
