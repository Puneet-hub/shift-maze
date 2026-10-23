# AI_LOG.md

## Tools
Claude (concept, code, solver, level generator). Browser for playtesting. GitHub for the repo.

## Key prompts
1. "Suggest which problem statement to pick" -> chose #3 Puzzle with a Twist (easy to verify)
2. "Lock the twist: classic maze, walls swap every 3 moves" -> rules + level plan
3. "Build a single index.html Shift Maze: two wall layouts, shift every 3 moves, ghost preview, wait, undo, restart, win screen, cream graph-paper navy/gold style" -> core loop
4. "Write solver.js: BFS over (x, y, moves mod 6) that reads LEVELS from index.html" -> proves every level is solvable
5. "It is worse. Fix all." -> rebuilt with bigger levels, blue/gold wall colours, shift pips, level menu with stars
6. "Write gen.js: generate random mazes, keep only levels where the shift really matters (the solver's shortest path beats the no-shift path, and walls-always-on is unsolvable or longer)" -> 7 generated levels + 2 hand-made tutorial levels
7. "Restyle to a glossy jungle mobile-game look from a reference image: logo badge, glass HUD, temple/crystal wall tiles, cartoon pug explorer, treasure-chest exit, glossy buttons, all drawn in CSS/SVG" -> final UI

## When AI got it wrong
- First build: levels were too small and easy (level 1 solved in 6 moves) and the dashed "next wall" preview was hard to read. Fixed with two wall colours (blue / gold), shift pips and a pulse on the last move before a shift.
- First generator run hung the machine (search rules too strict for big mazes). Fixed by capping tries and relaxing the difficulty rule step by step.

## How we checked the AI's work
`node solver.js` (BFS) confirms all 9 levels are solvable and prints the shortest solution (par). The game also shows par in the HUD.
`node gen.js` regenerates levels.
