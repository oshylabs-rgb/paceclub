# PaceClub Fighter

A Street Fighter style 2D versus brawler that runs in any browser. One self
contained HTML file, no build step, no dependencies.

## How to play

Double click `index.html` (or open it in your browser). That is it.

If your OS will not open it directly, run a tiny local server from this folder:

```
python3 -m http.server 8080
```

then visit http://localhost:8080

## Modes

- Press `1` for Arcade (you vs the CPU)
- Press `2` for Versus (two players on one keyboard)

Each match is best of 3 rounds, 60 seconds each.

## Controls

| Action | Player 1 | Player 2 |
|---|---|---|
| Move left / right | A / D | Left / Right arrows |
| Jump | W | Up arrow |
| Crouch | S | Down arrow |
| Block | hold away from opponent | hold away from opponent |
| Punch | F | K |
| Kick | G | L |
| Fireball | R | O |
| Uppercut | T | P |

`Enter` selects and advances. `Esc` returns to the menu.

## Tips

- Holding the direction away from your opponent blocks and chips only a sliver
  of damage instead of taking the full hit.
- The uppercut launches and is your anti air. Use it when they jump in.
- Fireballs have a cooldown, so do not spam into a blocker who can walk it down.
- Landing hits before the combo timer runs out builds the hit counter.

Built as a standalone prototype. It lives in its own folder and does not touch
the PaceClub Next.js app.
