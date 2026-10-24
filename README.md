# vibe.remix

Live-code the vibe with [Strudel](https://strudel.cc) — a browser live-coding
environment that brings the [TidalCycles](https://tidalcycles.org) pattern
language to JavaScript.

A minimal single-page app: type a Strudel pattern, hit play, and remix in real
time.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL, click a preset (or write your own pattern) and
press ▶ play. `ctrl/cmd + enter` in the editor also triggers play.

To make a production build:

```bash
npm run build
npm run preview
```

## How it works

- [`@strudel/web`](https://www.npmjs.com/package/@strudel/web) bundles the
  Strudel engine for the browser. `initStrudel()` wires up the Web Audio
  context and exposes the pattern language (`note`, `s`, `stack`, `jux`, …).
- Presets are plain Strudel code strings — the exact same syntax you'd paste
  into the [strudel.cc REPL](https://strudel.cc).
- `evaluate()` runs the editor content; `hush()` stops everything.

## Presets

| name     | feel                                    |
| -------- | --------------------------------------- |
| seed     | classic Strudel demo — G minor melody   |
| lofi     | dusty beats + warm saw chords           |
| acid     | squelchy saw bass + four-on-the-floor   |
| ambient  | slow sine pads drifting in F major      |

## License

Strudel is [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html). This project
uses it as a dependency and is released under the same license — see
[LICENSE](./LICENSE).
