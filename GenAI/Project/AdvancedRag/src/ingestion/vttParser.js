import fs from "fs/promises";
import path from 'path'

export async function parseVtt(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const source = path.basename(filePath);

  // Remove the WEBVTT header if present
  const normalized = content.replace(/^WEBVTT\s*/m, "").trim();

  // Split on blank lines
  const blocks = normalized.split(/\r?\n\r?\n/);

  const subtitles = [];

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter(Boolean);

    if (lines.length < 2) continue;

    let timestampLine = lines[0];
    let textStartIndex = 1;

    // Some VTT files have an identifier before the timestamp
    if (!timestampLine.includes("-->") && lines.length >= 3) {
      timestampLine = lines[1];
      textStartIndex = 2;
    }

    if (!timestampLine.includes("-->")) continue;

    const [start, end] = timestampLine
      .split("-->")
      .map((t) => t.trim());

    const text = lines.slice(textStartIndex).join(" ").trim();

    subtitles.push({
      start,
      end,
      text,
      source
    });
  }

  return subtitles;
}