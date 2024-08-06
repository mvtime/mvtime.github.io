## Task Tracker Framework

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

use `--mode [mode]` to run with alternative `.env.[mode]` or `.env.[mode].local` files

#### Builds and deploys to Github Pages

(builds to the gh-pages branch with the options in `.env.local` or `.env`)

```
npm run deploy
```

or optionally when cmu-tt is side-by-side (requires all changes to be pushed to remote for full parity):

```
npm run deploy & (cd ../cmu-tt.github.io && npm run deploy)
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
