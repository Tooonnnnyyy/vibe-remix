// Granular Strudel setup — mirrors strudel.cc's own `packages/web/web.mjs`,
// but with @strudel/soundfonts enabled. We deliberately do NOT use the
// pre-bundled `@strudel/web` package: it inlines its own private copy of the
// audio engine, so `@strudel/soundfonts` (which imports from the standalone
// `@strudel/webaudio`) would register GM instruments into a different engine
// than the one patterns play through, and sounds like `gm_epiano1` would
// never resolve. Using the granular packages keeps a single shared engine.

import { Pattern, evalScope, setTime } from '@strudel/core'
import * as core from '@strudel/core'
import * as mini from '@strudel/mini'
import * as tonal from '@strudel/tonal'
import * as webaudio from '@strudel/webaudio'
import {
  initAudioOnFirstClick,
  registerSynthSounds,
  webaudioRepl,
  samples,
  aliasBank
} from '@strudel/webaudio'
import { registerSoundfonts } from '@strudel/soundfonts'
import { transpiler } from '@strudel/transpiler'
import { miniAllStrings } from '@strudel/mini'

import { ninetyNineNights } from './patterns/99-nights.js'

let repl
let initDone
let audioReady

// Load every Strudel function into the global scope (that's how `evaluate()`
// can resolve bare names like `note`, `s`, `stack`, `sine`, `setcps`, ...).
async function defaultPrebake() {
  const loadModules = evalScope(core, mini, tonal, webaudio, { hush, evaluate })
  await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()])
}

function initStrudel(options = {}) {
  // Resolves once the first user gesture has resumed the AudioContext and the
  // AudioWorklet modules are loaded. We await it before every evaluate() so the
  // first click doesn't race the worklet loader (shape-processor, supersaw, …).
  audioReady = initAudioOnFirstClick()
  options.miniAllStrings !== false && miniAllStrings()
  const { prebake, ...replOptions } = options
  repl = webaudioRepl({ ...replOptions, transpiler })
  initDone = (async () => {
    await defaultPrebake()
    await prebake?.()
    return repl
  })()
  setTime(() => repl.scheduler.now())
  return initDone
}

Pattern.prototype.play = function () {
  if (!repl) {
    throw new Error('.play: no repl found. Have you called initStrudel?')
  }
  initDone.then(() => {
    repl.setPattern(this, true)
  })
  return this
}

function hush() {
  repl.stop()
}

async function evaluate(code, autoplay = true) {
  await audioReady
  return repl.evaluate(code, autoplay)
}

// A few starter "vibes" — valid Strudel patterns. Each string is raw
// Strudel code, the same syntax you'd type in the strudel.cc REPL.
const PRESETS = {
  seed: `setcps(0.8)
stack(
  n("<0 1 2 3 4>*8").scale('G4:minor').s('sawtooth')
    .clip(sine.range(.2,.8).slow(8))
    .jux(rev)
    .room(2)
    .sometimes(add(note("12")))
    .lpf(perlin.range(200,20000).slow(4)),
  s("bd(3,8)")
)`,

  lofi: `setcps(0.6)
stack(
  s("hh*8").gain(.3),
  s("bd(3,8)"),
  note("c4 eb4 g4 bb4").s('triangle').gain(.4)
    .lpf(600).room(.6)
    .sometimes(add(note(7)))
)
  .slow(2)
  .room(.2)`,

  acid: `setcps(2)
stack(
  n("0 3 7 10 3 7 12 7")
    .scale('C:minor')
    .s('sawtooth')
    .cutoff(perlin.range(200,4000).fast(2))
    .resonance(8)
    .decay(.1)
    .sustain(0)
    .sometimes(x=>x.speed(2))
    .jux(rev),
  s("bd*4"),
  s("hh*8").gain(.2)
)`,

  ambient: `setcps(0.3)
n("<0 2 4 5 7 9>").scale('F:major')
  .s('sine')
  .gain(.5)
  .attack(.5)
  .release(4)
  .lpf(perlin.range(200,2000).slow(3))
  .room(4)
  .sometimes(add(note("<-12 -7 7>")))
  .jux(rev)`
}

// The full-length composition, loaded lazily from its own module.
const FULL_TRACKS = {
  '99 nights': ninetyNineNights
}

initStrudel({
  prebake: () => {
    // Same default sound libraries the strudel.cc REPL ships with, so presets
    // can use piano, VCSL instruments, TR drum machines and GM soundfonts
    // (gm_epiano1, etc.) in addition to dirt-samples.
    aliasBank('https://strudel.b-cdn.net/tidal-drum-machines-alias.json')
    return Promise.all([
      samples('github:tidalcycles/dirt-samples'),
      samples('https://strudel.b-cdn.net/piano.json', 'https://strudel.b-cdn.net/piano/'),
      samples('https://strudel.b-cdn.net/vcsl.json', 'https://strudel.b-cdn.net/VCSL/'),
      samples(
        'https://strudel.b-cdn.net/tidal-drum-machines.json',
        'https://strudel.b-cdn.net/tidal-drum-machines/machines/'
      )
    ])
  }
})

const editor = document.getElementById('editor')
const playBtn = document.getElementById('play')
const stopBtn = document.getElementById('stop')

function loadPattern(code) {
  editor.value = code
}

function play() {
  try {
    evaluate(editor.value)
  } catch (err) {
    console.error(err)
  }
}

function stop() {
  hush()
}

playBtn.addEventListener('click', play)
stopBtn.addEventListener('click', stop)

document.querySelectorAll('.preset').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.pattern
    const code = PRESETS[key] ?? FULL_TRACKS[key]
    loadPattern(code ?? '')
    play()
  })
})

// ctrl/cmd + enter to run
editor.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    play()
  }
})

// Load the seed vibe on first open so there's something to hear.
loadPattern(PRESETS.seed)
