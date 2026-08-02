import path from "path";

import { discoverFiles } from "./discoverFiles.js";
import { loadSubtitle } from "./loader.js";
import { extractMetadata } from "./metadata.js";
import { createChunks } from "./chunker.js";

async function ingest() {
  const dataFolder = path.join(
    process.cwd(),
    "data",
    "mobile-dev-course"
  );

  // Step 1: Find all subtitle files
  const files = await discoverFiles(dataFolder);

  console.log(`\nFound ${files.length} subtitle files\n`);

  const allChunks = [];

  // Step 2: Process every subtitle file
  for (const file of files) {
    console.log(`Processing: ${path.basename(file)}`);

    const subtitles = await loadSubtitle(file);

    const metadata = extractMetadata(file);

    const chunks = createChunks(subtitles, metadata);

    allChunks.push(...chunks);
  }

  console.log("\n==============================");
  console.log("INGESTION COMPLETED");
  console.log("==============================");
  console.log(`Subtitle Files : ${files.length}`);
  console.log(`Total Chunks   : ${allChunks.length}`);

  console.log("\nFirst Chunk:\n");
  console.log(allChunks[0]);

  return allChunks;
}

ingest().catch(console.error);