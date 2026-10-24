import { initStrudel } from '@strudel/web'

// A few starter "vibes" — valid Strudel patterns. Each string is raw
// Strudel code, the same syntax you'd type in the strudel.cc REPL.
//
// Sounds come from two places:
//   - synth voices built into the engine: sine, triangle, sawtooth, square
//   - percussion from dirt-samples: bd, sd, hh, cp, ...
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

initStrudel({
  prebake: () => samples('github:tidalcycles/dirt-samples')
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
    // Keep the page alive if a pattern has a typo.
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
    loadPattern(PRESETS[btn.dataset.pattern] ?? '')
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
