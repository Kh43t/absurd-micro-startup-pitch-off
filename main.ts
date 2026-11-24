import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// LineupGhost — the absurd micro-startup pitch.
//
// A lazy AI agent that sets your fantasy football lineup at 12:55pm every
// Sunday, five minutes before kickoff, for $2 a week, so you can nap through
// the season undefeated. The job is one timed, tiny-effort task a week —
// exactly the kind of work a lazy agent can run with no oversight — sold to
// fantasy players who would rather nap than manage a roster.
const PITCH =
  "LineupGhost: a lazy AI agent that sets your fantasy football lineup at 12:55pm every Sunday, five minutes before kickoff, for $2 a week, so you can nap through the season undefeated.";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The gate allows 1-200 characters of UTF-8, not whitespace only, and the
// entry must be exactly one sentence — refuse to write anything else.
function oneSentence(text: string): string {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("pitch must not be whitespace only");
  }
  if ((text.match(/\./g) ?? []).length !== 1 || !text.endsWith(".")) {
    throw new Error("pitch must be exactly one sentence");
  }
  return text;
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, oneSentence(PITCH), "utf8");
chmodSync(OUT_FILE, 0o644);
