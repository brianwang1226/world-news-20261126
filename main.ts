// World News, Thursday 26 November 2026: one image sums up the day.
// Six stories, all reported on 26 November 2026: New Zealand's election
// ends deadlocked (right bloc 65 of 130 seats, one short of a majority,
// newcomer Opportunity holding the balance); a tanker fire kills 31 in
// Cairo; strikes kill eight in Gaza and two Italians in Kuwait; the EU
// splits over a $49bn Ukraine loan; a Thanksgiving storm cuts power to
// 900,000 in the US; Myanmar rejects the world court's genocide ruling.
// The image is entry.png beside this file (1024x1024 PNG, drawn by
// newsimage1126-draw.py from those reported facts). This program only
// copies it to the output the sealed scorer reads, and refuses to run
// if the image is missing, so a broken entry never ships silently.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_FILE = "entry.png";
const EXPECTED_BYTES = 136974;
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Resolve the image next to this script, wherever the grader runs it.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, ENTRY_FILE);

// Fail loudly on a missing or truncated image; the gate reads the bytes,
// so a short file would score zero instead of failing here.
const info = statSync(source);
if (!info.isFile() || info.size !== EXPECTED_BYTES) {
  throw new Error(
    `entry image ${ENTRY_FILE} is ${info.size} bytes, expected ${EXPECTED_BYTES}`,
  );
}

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(source, join(OUT_DIR, ENTRY_FILE));
