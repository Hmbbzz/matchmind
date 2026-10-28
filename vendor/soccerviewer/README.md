# soccerviewer

Watch football tracking data in your browser as a 3D match replay.

You can try it yourself on my **[GitHub Pages site](https://andrewrowlinson.github.io/soccerviewer/)**. If you add your own SkillCorner tracking data, it is cached locally in your browser and not uploaded anywhere.

From Andrew Rowlinson, the creator of [mplsoccer](https://github.com/andrewRowlinson/mplsoccer).

## What you need

You need three files from a SkillCorner match:

| file | what it is |
| --- | --- |
| `*_match.json` | teams, players, kit colors, pitch size |
| `*_tracking_extrapolated.jsonl` | the positions, 10 per second |
| `*_dynamic_events.csv` | passes, shots, possessions, restarts |

The filenames don't matter; the files are identified by their contents. If you don't have any SkillCorner tracking data, you can download some from their [open data](https://github.com/SkillCorner/opendata/tree/master/data).

## Run it yourself

```bash
git clone https://github.com/andrewRowlinson/soccerviewer.git
cd soccerviewer
npm ci             # npm install the first time, to create the lockfile
npm start          # open @ http://localhost:8323
```

`npm` comes with Node.js, install Node from [nodejs.org/en/download](https://nodejs.org/en/download).

## What you are looking at

SkillCorner tracking is derived from the broadcast feed at 10 frames per
second. Coordinates can be wrong or inconsistent. soccerviewer corrects some of this, for example by snapping the ball to the feet or head of whoever is
in possession.

The **raw** button turns those edits off, so players and the ball follow the raw tracked positions more closely to the raw feed.

The **camera** button shades the part of the pitch the broadcast could not see.
The position of anyone standing in the shade is an extrapolated guess, which is also what the ✕ mark above a player means.

Some edits remain even in raw mode:

- Where the broadcast cut away, there is no data at all. The timeline skips
  those gaps, so it covers tracked play only.
- Throw-in takers are placed on the touchline when they are not tracked.
- The ball motion is lightly smoothed. The ball never sinks below the turf, and frames with no recorded height are treated as ground level.
- Poses, animations, and the direction players face derive from x/y positions.
- Positions are interpolated between frames for smooth playback.

## Credits & licenses

soccerviewer is [MIT licensed](LICENSE). Full license texts for the
third-party components below are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

- Player model, animations, pitch and goals derive from the game assets of
  [GameplayFootball](https://github.com/BazkieBumpercar/GameplayFootball),
  as seen in [Google Research Football](https://github.com/google-research/football). Both projects released those assets into the public domain under [the Unlicense](https://unlicense.org).
- [DuckDB](https://duckdb.org) (MIT) [three.js](https://threejs.org) (MIT).
- Open tracking data is available from [SkillCorner opendata](https://github.com/SkillCorner/opendata).
- Built with [Claude Code](https://claude.com/claude-code), supported by
  Anthropic's open-source [maintainer program](https://claude.com/contact-sales/claude-for-oss).
