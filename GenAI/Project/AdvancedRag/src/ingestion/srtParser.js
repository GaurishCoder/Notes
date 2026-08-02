import fs from "fs/promises";
import path from "path";

export async function parseSrt(filePath) {
  const content = await fs.readFile(filePath, "utf-8");

  // Split into subtitle blocks
  const blocks = content.trim().split(/\r?\n\r?\n/);

  const subtitles = [];
  const source = path.basename(filePath);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter(Boolean);

    // Each block should have at least:
    // 1
    // 00:00:00,000 --> 00:00:03,000
    // Subtitle text
    if (lines.length < 3) continue;

    const timestampLine = lines[1];

    if (!timestampLine.includes("-->")) continue;

    const [start, end] = timestampLine
      .split("-->")
      .map((time) => time.trim());

    const text = lines.slice(2).join(" ").trim();

    subtitles.push({
      start,
      end,
      text,
      source,
    });
  }

  return subtitles;
}