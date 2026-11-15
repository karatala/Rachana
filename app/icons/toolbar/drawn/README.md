# Drawn and composed palette symbols

Original SVG paths use the application GPL-3.0 license; see LICENSE.txt, copied from the repository root. Musical glyph fragments come from Bravura 1.38, copyright 2015 Steinberg Media Technologies GmbH. Bravura is a Reserved Font Name. Source: the unmodified local public/font/Bravura.otf; SHA-256 883a86a8cfe77db6597b8ef56b9cf6efb079b0631a283a323945a41f976fb483. Source project: https://github.com/steinbergmedia/bravura. See Bravura-OFL.txt for the SIL Open Font License 1.1. These files are SVG artwork, not a renamed font. Original lettering is drawn as paths; no system font, raster image or external resource is used.

All icons use a 24 by 24 viewBox and the existing CSS alpha mask. Keep src/frontend/editor/toolbar-icons.ts assignments tied to command meaning. For slides, time runs left to right: an incoming slide line is to the left of its destination note, and an outgoing slide line is to the right of its source note. From below rises toward the note; from above falls toward the note. Up/down outgoing slides rise/fall after the note. Pick slides use stepped lines and remain separate from smooth slides.

| Command or choice | SVG | Composition |
| --- | --- | --- |
| note:ghost | ghost-note.svg | Bravura noteheadBlack, noteheadParenthesisLeft and noteheadParenthesisRight |
| action:triplet | triplet.svg | Bravura tuplet3 with a drawn bracket |
| action:tie | tie.svg | Bravura noteheadBlack twice; equal-height notes with a lower tie |
| slur | slur.svg | Bravura noteheadBlack twice; different-height notes with an upper slur |
| note:letRing | let-ring.svg | Original outlined LET / RING lettering |
| articulation:palm-mute | palm-mute.svg | Original outlined PM lettering |
| hammer-on-pull-off | hammer-on-pull-off.svg | Original H/P lettering, Bravura noteheadBlack twice and an upper slur |
| slide:below | slide-in-below.svg | Bravura noteheadBlack; rising line on the left ends at the destination note |
| slide:above | slide-in-above.svg | Bravura noteheadBlack; falling line on the left ends at the destination note |
| slide:up | slide-out-up.svg | Bravura noteheadBlack; rising line on the right leaves the source note |
| slide:down | slide-out-down.svg | Bravura noteheadBlack; falling line on the right leaves the source note |
| slide:shift | slide-shift.svg | Bravura noteheadBlack twice with a straight slide line |
| slide:legato | slide-legato.svg | Shift slide plus an upper legato slur |
| slide:pick-up | pick-slide-up.svg | Original ascending stepped pick slide after a muted-note cross |
| slide:pick-down | pick-slide-down.svg | Original descending stepped pick slide after a muted-note cross |
| dead-slap | dead-slap.svg | Original large muted-slap cross |
| brush:arpeggio-up | arpeggio-up.svg | Original vertical arpeggio wave with an upward arrow |
| brush:arpeggio-down | arpeggio-down.svg | Original vertical arpeggio wave with a downward arrow |
| rasgueado | rasgueado.svg | Original RASG lettering and three strum arrows |
| bend | bend.svg | Original rising bend curve with an arrow |
| whammy | whammy.svg | Original downward whammy curve with an arrow and an upper cross |
| vibrato:slight | guitarVibratoStroke.svg | Bravura guitarVibratoStroke repeated three times |
| vibrato:wide | guitarWideVibratoStroke.svg | Bravura guitarWideVibratoStroke repeated three times |
| swing:triplet-8th | swing-triplet-eighths.svg | Bravura noteheadBlack and tuplet3; beamed eighths with a triplet bracket |
| stem:up | stem-up.svg | Bravura noteheadBlack; up stem and an upward arrow |
| stem:down | stem-down.svg | Bravura noteheadBlack; down stem and a downward arrow |
| beam:merge-with-next | beam-join.svg | Bravura noteheadBlack twice with one continuous beam |
| beam:auto | beam-auto.svg | Joined beam with original A lettering |
| beam:split-to-next | beam-split.svg | Two independent Bravura note8thUp glyphs |
| beam:split-secondary-to-next | beam-secondary-split.svg | Continuous primary beam and split secondary beam |
| note-grouping | beam-grouping.svg | Bravura noteheadBlack four times with two independent grouping brackets |
| text | text.svg | Original outlined T with two text lines |
| beat-timer | beat-timer.svg | Original stopwatch outline |

- `articulation:staccato` uses `staccato-note.svg`: original filled quarter note with a staccato dot below, based on the requested reference.
- `beat-legato` uses `legato-notes.svg`: original ascending quarter notes with a slur above, based on the requested reference.

- `repeat-start`, `repeat-end` and `alternate-endings` use original bar lines, repeat dots and a first-ending bracket in their matching SVG files.

- `add-bar-before` and `add-bar-after` use original staff/bar lines with a plus on the insertion side. The pair shares the standard 24-unit view box and toolbar mask colors.
