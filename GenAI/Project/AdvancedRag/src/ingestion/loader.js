import path from "path";
import { parseVtt } from "./vttParser.js";
import { parseSrt } from "./srtParser.js";

export async function loadSubtitle(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".vtt":
      return await parseVtt(filePath);

    case ".srt":
      return await parseSrt(filePath);

    default:
      throw new Error(`Unsupported subtitle format: ${extension}`);
  }
}