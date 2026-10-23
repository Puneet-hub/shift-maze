# Shift Maze

**Pixathon problem statement 3: Puzzle with a Twist**

A classic maze, but **every 3 moves the walls swap places**. Blue walls and gold walls take turns.
Plan your path, and wait when you need to. Reach the treasure chest.

## Play
Open `index.html` in any browser. No install, no build step.

| Key | Action |
|---|---|
| Arrows / WASD | Move |
| Space | Wait (counts as a move) |
| Z | Undo |
| R | Restart level |
| M | Menu |

Solid blue or gold blocks are walls now. Dashed blocks become walls after the next shift.
A move is blocked if it would leave you inside a wall after the shift.

## Features
- 9 levels, from a 7x5 tutorial to an 11x11 maze, each with a par from the solver
- Shift counter, undo, restart, level menu with stars, saved progress
- Cartoon art and sound drawn in code (no image files), optional chiptune music

## How AI was used
See [AI_LOG.md](AI_LOG.md). In short:
- `solver.js`: BFS over (x, y, moves mod 6) proves every level is solvable and gives the par. Run `node solver.js`.
- `gen.js`: generates random mazes and keeps only levels where the shift really matters. Run `node gen.js`.
