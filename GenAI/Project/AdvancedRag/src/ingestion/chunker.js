export function createChunks(
  subtitles,
  metadata,
  maxChars = 1000,
  overlap = 200
) {
  const chunks = [];

  let currentChunk = [];
  let currentLength = 0;

  for (const subtitle of subtitles) {
    currentChunk.push(subtitle);
    currentLength += subtitle.text.length;

    if (currentLength >= maxChars) {
      chunks.push({
        ...metadata,
        start: currentChunk[0].start,
        end: currentChunk[currentChunk.length - 1].end,
        text: currentChunk.map((s) => s.text).join(" "),
      });

      // Keep overlap
      let overlapChunk = [];
      let overlapLength = 0;

      for (let i = currentChunk.length - 1; i >= 0; i--) {
        overlapChunk.unshift(currentChunk[i]);
        overlapLength += currentChunk[i].text.length;

        if (overlapLength >= overlap) {
          break;
        }
      }

      currentChunk = overlapChunk;
      currentLength = overlapLength;
    }
  }

  if (currentChunk.length) {
    chunks.push({
      ...metadata,
      start: currentChunk[0].start,
      end: currentChunk[currentChunk.length - 1].end,
      text: currentChunk.map((s) => s.text).join(" "),
    });
  }

  return chunks;
}