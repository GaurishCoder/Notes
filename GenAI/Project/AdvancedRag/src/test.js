import { loadSubtitle } from "./ingestion/loader.js";
import { extractMetadata } from "./ingestion/metadata.js";
import { createChunks } from "./ingestion/chunker.js";

const file =
  "data/mobile-dev-course/module 1/01_what-is-mobile-development_epm/01_what-is-mobile-development_epm.vtt";

const subtitles = await loadSubtitle(file);

const metadata = extractMetadata(file);

const chunks = createChunks(subtitles, metadata);

console.log(chunks[0]);