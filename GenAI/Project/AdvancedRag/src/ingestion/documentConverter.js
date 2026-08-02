import { Document } from "../models/document.js";

export function chunksToDocuments(chunks) {
  return chunks.map((chunk) => {
    return new Document(
      chunk.text,
      {
        course: chunk.course,
        module: chunk.module,
        lecture: chunk.lecture,
        source: chunk.source,
        start: chunk.start,
        end: chunk.end,
      }
    );
  });
}