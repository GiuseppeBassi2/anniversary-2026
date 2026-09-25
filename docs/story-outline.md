# Story outline

This document fixes the macro narrative structure while captions, media selection, and fine-grained scene pacing remain provisional.

## Act I — How we started

1. Opening / one year
2. Toronto
3. Flight transition
4. Italy I
5. Short apart interlude
6. Flight transition
7. Korea + Japan

## Act II — How we became us

8. Short apart interlude
9. Flight transition
10. Italy Summer / our little life
11. Many Minnies / everyday fragments
12. Last goodbye / now

## Act III — Where I hope this goes

13. “So what happens next?”
14. Princeton
15. Future home
16. Min’s kitchen
17. Bedroom / escalating goose-pillow joke
18. Playful speculative family section
19. Break the joke / sincere transition
20. Final real photo + anniversary message

## Supported scene types

| Type | Intended use |
| --- | --- |
| `intro` | Opening title or anniversary setup with generous negative space |
| `hero` | One dominant image with a short caption |
| `collage` | Automatic layouts for two to five related images |
| `photoStack` | A tactile stack for a small group of related memories |
| `video` | One dominant vertical video, loaded only when needed |
| `memoryDump` | A compact grid for many everyday fragments |
| `flight` | Minimal route transition between geographic chapters |
| `text` | A quiet interlude or narrative turn without media |
| `jokeReveal` | A staged visual punchline or escalating recurring joke |
| `ending` | Final real photo and anniversary message |

## Scene data contract

Scenes live in `site/js/story.js`; the HTML contains only the application shell. Each scene has an `id`, `act`, optional `period`, `type`, title, placeholder caption, and centralized `media` array. Layout is either explicit or `auto`.

```js
{
  id: "example-scene",
  act: "Act II — How we became us",
  period: "F",
  type: "collage",
  title: "[Working title]",
  caption: "[Placeholder copy — edit later.]",
  layout: "auto",
  media: []
}
```

Real media paths are intentionally absent. After the CSV and JSON manifests are available, media records can be mapped into these arrays without changing the renderer.

## Automatic media layouts

- 1 item: hero
- 2 items: split
- 3 items: asymmetric collage
- 4 items: 2 × 2 grid
- 5 items: one larger item plus four smaller items
- More than 5 items: compact memory dump
- Vertical video: dominant portrait frame

Media defaults to `object-fit: contain`. A scene may opt into `cover` and an explicit focal position only after the real asset has been reviewed.
