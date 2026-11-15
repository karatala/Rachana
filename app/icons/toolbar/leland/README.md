# Leland palette symbols

These SVG outlines come from the unmodified Leland 0.80 music font, developed for MuseScore Studio. Copyright 2025 MuseScore BVBA. Leland is a Reserved Font Name. See LICENSE.txt for the SIL Open Font License 1.1. These files are SVG artwork, not a renamed font.

Source: https://github.com/MuseScoreFonts/Leland/tree/d91cf5d21045e2c294541676ad386b7ffb4ac881

Font: Leland.otf, SHA-256 293788a40584b1908e3a0f219833f6a13e9a1aaf671e08fd26ad18fad2631b35. The source font is not required at runtime.

Each icon contains the source glyph outline, scaled and centered in a 24 by 24 viewBox. Duration stems use up-facing glyphs. Dynamics share one scale. The double-dot icon repeats augmentationDot at two positions. Icon color comes from the existing CSS mask. Keep command assignments in src/frontend/editor/toolbar-icons.ts; symbols without a matching Leland outline use the neighboring Bravura or drawn SVG sets.

| Command or choice | SVG | Source code point |
| --- | --- | --- |
| duration:1 | noteWhole.svg | U+E1D2 |
| duration:2 | noteHalfUp.svg | U+E1D3 |
| duration:4 | noteQuarterUp.svg | U+E1D5 |
| duration:8 | note8thUp.svg | U+E1D7 |
| duration:16 | note16thUp.svg | U+E1D9 |
| duration:32 | note32ndUp.svg | U+E1DB |
| duration:64 | note64thUp.svg | U+E1DD |
| dynamic:0 | dynamicPPP.svg | U+E52A |
| dynamic:1 | dynamicPP.svg | U+E52B |
| dynamic:2 | dynamicPiano.svg | U+E520 |
| dynamic:3 | dynamicMP.svg | U+E52C |
| dynamic:4 | dynamicMF.svg | U+E52D |
| dynamic:5 | dynamicForte.svg | U+E522 |
| dynamic:6 | dynamicFF.svg | U+E52F |
| dynamic:7 | dynamicFFF.svg | U+E530 |
| ottava:0 | quindicesimaAlta.svg | U+E515 |
| ottava:1 | ottavaAlta.svg | U+E511 |
| ottava:3 | ottavaBassaVb.svg | U+E51C |
| ottava:4 | quindicesimaBassaMb.svg | U+E51D |
| action:dots1 | augmentationDot.svg | U+E1E7 |
| action:rest | restQuarter.svg | U+E4E5 |
| articulation:staccato | articStaccatoAbove.svg | U+E4A2 |
| articulation:accent | articAccentAbove.svg | U+E4A0 |
| articulation:heavy-accent | articMarcatoAbove.svg | U+E4AC |
| articulation:tenuto | articTenutoAbove.svg | U+E4A4 |
| fermata | fermataAbove.svg | U+E4C0 |
| pick:up | stringsUpBow.svg | U+E612 |
| pick:down | stringsDownBow.svg | U+E610 |
| harmonics | stringsHarmonic.svg | U+E614 |
| grace:before-beat | graceNoteAcciaccaturaStemUp.svg | U+E560 |
| grace:on-beat | graceNoteAppoggiaturaStemUp.svg | U+E562 |
| trill | ornamentTrill.svg | U+E566 |
| ornament:turn | ornamentTurn.svg | U+E567 |
| ornament:inverted-turn | ornamentTurnInverted.svg | U+E568 |
| ornament:upper-mordent | ornamentShortTrill.svg | U+E56C |
| ornament:lower-mordent | ornamentMordent.svg | U+E56D |
| accidentalMode:natural | accidentalNatural.svg | U+E261 |
| accidentalMode:sharp | accidentalSharp.svg | U+E262 |
| accidentalMode:flat | accidentalFlat.svg | U+E260 |
| accidentalMode:double-sharp | accidentalDoubleSharp.svg | U+E263 |
| accidentalMode:double-flat | accidentalDoubleFlat.svg | U+E264 |
| crescendo:crescendo | dynamicCrescendoHairpin.svg | U+E53E |
| crescendo:decrescendo | dynamicDiminuendoHairpin.svg | U+E53F |
| sustain:down | keyboardPedalPed.svg | U+E650 |
| sustain:up | keyboardPedalUp.svg | U+E655 |
| simile:simple | repeat1Bar.svg | U+E500 |
| simile:double | repeat2Bars.svg | U+E501 |
| staff:showStandardNotation | gClef.svg | U+E050 |
| action:dots2 | augmentationDoubleDot.svg | U+E1E7 twice |
