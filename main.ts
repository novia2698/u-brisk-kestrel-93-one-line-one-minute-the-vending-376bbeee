// main.ts — One Line, One Minute: The Vending Machine Pickup Line Contest.
//
// The program writes a single pickup line, spoken by a vending machine to a
// passing human, to <output>/entry.txt. The gate accepts UTF-8 text of 1 to
// 200 characters, so the line is kept well inside that limit and is written
// byte-for-byte the same on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, as the machine says it. First person, the machine's own world
// (coil B4, its button, the drop), and the punch lands in the last few words.
const LINE =
  "Psst \u2014 I've been holding your favourite snack in coil B4 all day. " +
  "Press my button and let me finally drop for you.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate refuses anything outside 1..200 characters, so fail loudly here
// instead of ever writing a line the judge cannot read.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`pickup line is ${LINE.length} chars, must be 1..200`);
}
if (LINE.trim().length === 0) {
  throw new Error("pickup line is only whitespace");
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outputDir, "entry.txt")}`);
console.log(LINE);
