// ============================================================================
// "99 NIGHTS" — FULL-LENGTH VIBE REMIX (88 CYCLES / 8 SONG SECTIONS)
// Key: C# Minor / E Major (C#m - B - A - E) | Tempo: 106 BPM
// ============================================================================
//
// This is a standalone Strudel composition. It is exposed here as a template
// string so it can be loaded into the editor and played. The only edits from
// the original are the removal of two REPL-only visualizer calls
// (._pianoroll() and ._scope()), which do not exist in a bare @strudel/web
// build and would otherwise throw.

export const ninetyNineNights = String.raw`

setcps(106 / 60 / 4)

// ----------------------------------------------------------------------------
// 1. HARMONIC PAD & CHORD VOICINGS (C#m9 -> Badd9 -> Amaj7 -> Emaj7)
// ----------------------------------------------------------------------------

const chords_warm = note("<[c#3,e3,g#3,b3,d#4] [b2,d#3,f#3,a#3,c#4] [a2,c#3,e3,g#3,b3] [e3,g#3,b3,d#4,f#4]>")
  .sound("gm_epiano1")
  .lpf(sine.range(700, 2200).slow(8))
  .lpq(2)
  .attack(0.08)
  .decay(0.6)
  .sustain(0.7)
  .release(1.4)
  .room(0.65)
  .size(0.85)
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.4)
  .pan(sine.range(0.35, 0.65).slow(6))
  .gain(0.42)
  .color("#6366f1")

const chords_supersaw = note("<[c#3,g#3,c#4,e4,g#4] [b2,f#3,b3,d#4,f#4] [a2,e3,a3,c#4,e4] [e2,b2,e3,g#3,b3]>")
  .sound("supersaw")
  .struct("x ~ x x ~ x x ~")
  .lpf(sine.range(1200, 4800).slow(4))
  .lpq(3)
  .attack(0.02)
  .decay(0.25)
  .sustain(0.45)
  .release(0.35)
  .jux(x => x.detune(0.15))
  .room(0.5)
  .size(0.8)
  .gain(0.38)
  .color("#8b5cf6")

const chords_bridge_tension = note("<[f#3,a3,c#4,e4] [g#3,b3,d#4,f#4] [a3,c#4,e4,g#4] [b3,d#4,f#4,a4]>")
  .sound("sawtooth")
  .lpf(sine.range(600, 3600).slow(8))
  .attack(0.2)
  .release(1.8)
  .room(0.8)
  .size(0.9)
  .gain(0.36)
  .color("#a855f7")

// ----------------------------------------------------------------------------
// 2. LEAD VOCAL MELODY MOTIFS ("99 NIGHTS" MAIN THEME & VARIATIONS)
// ----------------------------------------------------------------------------

// Intro & Outro sparse haunting motif
const melody_intro = note("<[~ g#4 f#4 e4 ~ c#4 ~ ~] [~ f#4 e4 d#4 ~ b3 ~ ~] [~ e4 d#4 c#4 ~ a3 ~ ~] [~ b3 c#4 e4 f#4 g#4 ~ ~]>")
  .sound("triangle")
  .lpf(2400)
  .attack(0.03)
  .decay(0.4)
  .sustain(0.3)
  .release(0.8)
  .vib(4)
  .vibmod(0.15)
  .delay(0.55)
  .delaytime(0.375)
  .delayfeedback(0.55)
  .room(0.75)
  .size(0.9)
  .gain(0.48)
  .color("#38bdf8")

// Verse A: conversational syncopated melody
const melody_verse_a = note("<[~ c#4 e4 g#4 g#4 f#4 e4 c#4] [~ b3 d#4 f#4 f#4 e4 d#4 b3] [~ a3 c#4 e4 e4 d#4 c#4 a3] [~ g#3 b3 e4 d#4 c#4 b3 ~]>")
  .sound("sawtooth")
  .lpf(sine.range(1400, 2900).slow(4))
  .lpq(4)
  .attack(0.01)
  .decay(0.25)
  .sustain(0.35)
  .release(0.3)
  .legato(0.85)
  .delay(0.35)
  .delaytime(0.25)
  .delayfeedback(0.35)
  .room(0.45)
  .gain(0.5)
  .color("#0ea5e9")

// Verse B: rising melodic answer
const melody_verse_b = note("<[c#4 e4 g#4 b4 a4 g#4 f#4 e4] [d#4 f#4 b4 a#4 g#4 f#4 d#4 ~] [c#4 e4 a4 g#4 f#4 e4 c#4 e4] [g#4 ~ f#4 e4 ~ d#4 e4 ~]>")
  .sound("sawtooth")
  .lpf(sine.range(1600, 3400).slow(4))
  .lpq(4)
  .attack(0.01)
  .decay(0.25)
  .sustain(0.4)
  .release(0.35)
  .off(1/8, x => x.add(12).gain(0.22).lpf(1800))
  .delay(0.4)
  .delaytime(0.375)
  .delayfeedback(0.4)
  .room(0.5)
  .gain(0.52)
  .color("#06b6d4")

// Pre-Chorus: rhythmic build-up hook
const melody_prechorus = note("<[g#4 g#4 f#4 e4 ~ c#4 e4 f#4] [f#4 f#4 e4 d#4 ~ b3 d#4 e4] [e4 e4 d#4 c#4 ~ a3 c#4 e4] [f#4 g#4 a4 b4 ~ g#4 f#4 e4]>")
  .sound("supersaw")
  .lpf(sine.range(1800, 5200).slow(4))
  .attack(0.01)
  .decay(0.2)
  .sustain(0.5)
  .release(0.3)
  .delay(0.45)
  .delaytime(0.1875)
  .delayfeedback(0.45)
  .room(0.55)
  .gain(0.52)
  .color("#22d3ee")

// Chorus Hook: soaring "99 Nights" anthem lead with octave layer
const melody_chorus = note("<[c#5 b4 g#4 f#4 e4 g#4 ~ e4] [d#5 c#5 b4 f#4 ~ d#4 e4 f#4] [c#5 b4 a4 g#4 e4 c#4 ~ e4] [g#4 a4 b4 c#5 b4 g#4 f#4 e4]>")
  .sound("supersaw")
  .lpf(sine.range(2600, 6800).slow(4))
  .lpq(2.5)
  .attack(0.015)
  .decay(0.3)
  .sustain(0.65)
  .release(0.45)
  .superimpose(x => x.sub(12).sound("sawtooth").lpf(1800).gain(0.35))
  .vib(5)
  .vibmod(0.12)
  .delay(0.45)
  .delaytime(0.375)
  .delayfeedback(0.45)
  .room(0.65)
  .size(0.85)
  .gain(0.58)
  .color("#f43f5e")

// Climax Chorus Variation: high-energy embellished lead
const melody_chorus_climax = note("<[c#5 [b4 c#5] e5 c#5 b4 g#4 f#4 e4] [d#5 [c#5 d#5] f#5 d#5 c#5 b4 f#4 d#4] [c#5 [b4 c#5] e5 c#5 a4 g#4 e4 c#4] [g#4 a4 b4 [c#5 d#5] e5 b4 g#4 f#4]>")
  .sound("supersaw")
  .lpf(7500)
  .lpq(3)
  .attack(0.01)
  .decay(0.25)
  .sustain(0.7)
  .release(0.5)
  .superimpose(x => x.sub(12).sound("sawtooth").gain(0.38))
  .off(1/16, x => x.add(7).gain(0.2).lpf(3500))
  .delay(0.5)
  .delaytime(0.375)
  .delayfeedback(0.5)
  .room(0.7)
  .size(0.9)
  .gain(0.6)
  .color("#fb7185")

// ----------------------------------------------------------------------------
// 3. HYPNOTIC ARPEGGIATOR & COUNTER-MELODIES (16th-Note Rolling Plucks)
// ----------------------------------------------------------------------------

const arp_chill = note("<[c#4 e4 g#4 b4 c#5 b4 g#4 e4]*2 [b3 d#4 f#4 a#4 b4 a#4 f#4 d#4]*2 [a3 c#4 e4 g#4 a4 g#4 e4 c#4]*2 [e3 g#3 b3 d#4 e4 d#4 b3 g#3]*2>")
  .sound("triangle")
  .lpf(sine.range(800, 2600).slow(8))
  .lpq(3)
  .decay(0.12)
  .sustain(0.05)
  .release(0.1)
  .delay(0.5)
  .delaytime(0.1875)
  .delayfeedback(0.5)
  .jux(rev)
  .room(0.5)
  .gain(0.34)
  .color("#10b981")

const arp_drive = note("<[c#4 e4 g#4 c#5 e5 c#5 g#4 e4]*2 [b3 d#4 f#4 b4 d#5 b4 f#4 d#4]*2 [a3 c#4 e4 a4 c#5 a4 e4 c#4]*2 [e3 g#3 b3 e4 g#4 e4 b3 g#3]*2>")
  .sound("sawtooth")
  .lpf(sine.range(1200, 5400).slow(4))
  .lpq(5)
  .decay(0.09)
  .sustain(0.1)
  .release(0.08)
  .every(4, x => x.fast(2).lpf(4000))
  .pan(sine.range(0.15, 0.85).fast(2))
  .delay(0.45)
  .delaytime(0.25)
  .delayfeedback(0.45)
  .room(0.45)
  .gain(0.36)
  .color("#34d399")

// Dark Forest Music-Box Counter-Motif (inspired by "99 Nights in the Forest")
const arp_forest_box = note("<[c#5 g#4 e4 g#4 c5 g#4 d#4 g#4] [c#5 g#4 e4 g#4 d#5 a4 f#4 a4] [e5 b4 g#4 b4 d#5 b4 f#4 b4] [c#5 g#4 e4 g#4 b4 f#4 d#4 f#4]>")
  .sound("piano")
  .lpf(3200)
  .hpf(300)
  .decay(0.3)
  .release(0.6)
  .delay(0.6)
  .delaytime(0.375)
  .delayfeedback(0.55)
  .room(0.8)
  .size(0.9)
  .gain(0.4)
  .color("#a7f3d0")

// ----------------------------------------------------------------------------
// 4. BASSLINES (Sub Bass, Rolling Synthwave Bass, Reese Bass)
// ----------------------------------------------------------------------------

const bass_sub = note("<c#1 b1 a1 e1>")
  .sound("sine")
  .attack(0.04)
  .decay(0.6)
  .sustain(0.8)
  .release(0.4)
  .shape(0.2)
  .lpf(180)
  .gain(0.68)
  .color("#f59e0b")

const bass_groove = note("<[c#2 c#2 ~ c#2 c#2 ~ g#1 b1] [b1 b1 ~ b1 b1 ~ f#1 g#1] [a1 a1 ~ a1 a1 ~ e1 f#1] [e1 e1 ~ e1 g#1 ~ b1 ~]>")
  .sound("sawtooth")
  .lpf(sine.range(280, 750).slow(4))
  .lpq(4)
  .attack(0.01)
  .decay(0.18)
  .sustain(0.3)
  .release(0.12)
  .shape(0.3)
  .gain(0.6)
  .color("#d97706")

const bass_rolling = note("<[c#1 c#2 c#1 c#2 c#1 c#2 g#1 b1]*2 [b0 b1 b0 b1 b0 b1 f#1 g#1]*2 [a0 a1 a0 a1 a0 a1 e1 f#1]*2 [e1 e2 e1 e2 g#1 g#2 b1 b2]*2>")
  .sound("sawtooth")
  .lpf(sine.range(380, 1150).slow(2))
  .lpq(4.5)
  .decay(0.11)
  .sustain(0.2)
  .release(0.08)
  .shape(0.35)
  .gain(0.62)
  .color("#ea580c")

const bass_reese = note("<f#1 g#1 a1 b1>")
  .sound("supersaw")
  .lpf(sine.range(180, 620).slow(4))
  .lpq(3)
  .attack(0.1)
  .release(0.6)
  .shape(0.25)
  .gain(0.55)
  .color("#b45309")

// ----------------------------------------------------------------------------
// 5. DRUMS & PERCUSSION (909 / 808 Hybrid Groove + Fills)
// ----------------------------------------------------------------------------

const drums_minimal = stack(
  s("bd ~ ~ ~ bd ~ ~ ~").bank("RolandTR808").gain(0.75),
  s("~ ~ rim ~ ~ ~ rim ~").bank("RolandTR808").room(0.4).gain(0.5),
  s("hh*8").bank("RolandTR808").gain("<[0.25 0.15]*4>").pan(0.4)
)

const drums_verse = stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR909").shape(0.15).gain(0.82),
  s("~ ~ sd ~ ~ ~ [sd ~] ~").bank("RolandTR909").room(0.35).gain(0.72),
  s("hh*8").bank("RolandTR909").gain("[0.35 0.18 0.28 0.18]*2").pan(0.35),
  s("~ ~ ~ ~ ~ ~ ~ oh").bank("RolandTR909").decay(0.25).gain(0.32).pan(0.65)
).every(4, x => x.stack(s("~ ~ ~ ~ ~ ~ [sd sd] [sd*4]").bank("RolandTR909").gain(0.55)))

const drums_build = stack(
  s("bd*4").bank("RolandTR909").hpf("<0 120 240 400>").gain(0.75),
  s("<[sd*4] [sd*8] [sd*16] [sd*16]>")
    .bank("RolandTR909")
    .gain(saw.range(0.2, 0.85).slow(4))
    .lpf(saw.range(600, 8000).slow(4)),
  s("hh*16").bank("RolandTR909").gain(0.3)
)

const drums_drop = stack(
  s("bd*4").bank("RolandTR909").shape(0.22).gain(0.92),
  s("~ [sd,cp] ~ [sd,cp]").bank("RolandTR909").room(0.45).size(0.7).gain(0.84),
  s("[~ oh]*4").bank("RolandTR909").decay(0.22).gain(0.44).pan(0.6),
  s("hh*16").bank("RolandTR909").gain("[0.38 0.18 0.28 0.22]*4").pan(sine.range(0.25, 0.75).fast(4)),
  s("cr ~ ~ ~ ~ ~ ~ ~").slow(4).bank("RolandTR909").room(0.7).gain(0.42),
  s("~ ~ ~ rim ~ rim ~ ~").bank("RolandTR808").pan(0.3).gain(0.45)
).every(8, x => x.stack(s("~ ~ ~ ~ [lt mt] [mt ht] [sd*4] [sd*8]").bank("RolandTR909").gain(0.68)))

// ----------------------------------------------------------------------------
// 6. ATMOSPHERIC TEXTURES & FX SWEEPS
// ----------------------------------------------------------------------------

const fx_vinyl_rain = s("pink*4")
  .lpf(sine.range(400, 1400).slow(12))
  .hpf(250)
  .room(0.9)
  .size(0.95)
  .gain(0.11)

const fx_riser = s("white")
  .lpf(saw.range(300, 7500).slow(4))
  .lpq(6)
  .hpf(300)
  .room(0.8)
  .gain(saw.range(0.05, 0.38).slow(4))

// ============================================================================
// 7. MASTER MULTI-TRACK ARRANGEMENT (88 CYCLES TOTAL)
// ============================================================================
// Structure:
// [01-08] Intro (8 cycles)        — Haunting melody, warm Rhodes, music-box arp
// [09-20] Verse 1 (12 cycles)     — Syncopated lead, bass groove, minimal/verse beat
// [21-24] Pre-Chorus (4 cycles)   — Rising tension, snare roll build, riser sweep
// [25-40] Chorus Drop 1 (16 cyc)  — Full anthem lead, supersaws, rolling synthwave bass
// [41-52] Verse 2 / Dark (12 cyc) — Forest music-box motif + Verse B lead + chill groove
// [53-60] Bridge & Build (8 cyc)  — Reese bass, tension chords, accelerating build
// [61-76] Final Climax (16 cyc)   — Embellished octave hook, maximum energy drop
// [77-88] Outro Fade (12 cycles)  — Stripping back to piano, warm pads, and sub pulse
// ============================================================================

stack(
  // TRACK 1: LEAD MELODIES
  arrange(
    [8,  melody_intro],
    [6,  melody_verse_a],
    [6,  melody_verse_b],
    [4,  melody_prechorus],
    [16, melody_chorus],
    [6,  melody_intro],
    [6,  melody_verse_b],
    [4,  melody_intro.lpf(1500)],
    [4,  melody_prechorus],
    [16, melody_chorus_climax],
    [12, melody_intro.lpf(sine.range(600, 2000).slow(12))]
  ),

  // TRACK 2: CHORDS & HARMONIC PADS
  arrange(
    [8,  chords_warm],
    [12, chords_warm],
    [4,  chords_supersaw.lpf(saw.range(800, 4500).slow(4))],
    [16, stack(chords_warm, chords_supersaw)],
    [12, chords_warm],
    [8,  chords_bridge_tension],
    [16, stack(chords_warm, chords_supersaw)],
    [12, chords_warm.lpf(900)]
  ),

  // TRACK 3: ARPEGGIOS & COUNTER-MELODIES
  arrange(
    [4,  silence],
    [4,  arp_forest_box],
    [12, arp_chill],
    [4,  arp_drive.lpf(saw.range(1000, 6000).slow(4))],
    [16, arp_drive],
    [12, stack(arp_chill, arp_forest_box)],
    [4,  arp_forest_box],
    [4,  arp_drive],
    [16, stack(arp_drive, arp_forest_box)],
    [12, arp_forest_box.gain(0.28)]
  ),

  // TRACK 4: BASSLINES
  arrange(
    [8,  bass_sub],
    [12, bass_groove],
    [4,  bass_sub],
    [16, bass_rolling],
    [12, bass_groove],
    [8,  bass_reese],
    [16, stack(bass_rolling, bass_sub.gain(0.45))],
    [12, bass_sub.gain(0.5)]
  ),

  // TRACK 5: DRUMS & PERCUSSION
  arrange(
    [4,  silence],
    [4,  drums_minimal],
    [12, drums_verse],
    [4,  drums_build],
    [16, drums_drop],
    [4,  drums_minimal],
    [8,  drums_verse],
    [4,  drums_minimal],
    [4,  drums_build],
    [16, drums_drop],
    [8,  drums_minimal],
    [4,  silence]
  ),

  // TRACK 6: ATMOSPHERE & RISERS
  arrange(
    [20, fx_vinyl_rain],
    [4,  stack(fx_vinyl_rain, fx_riser)],
    [28, fx_vinyl_rain],
    [4,   fx_vinyl_rain],
    [4,  stack(fx_vinyl_rain, fx_riser)],
    [28, fx_vinyl_rain]
  )
)
`
