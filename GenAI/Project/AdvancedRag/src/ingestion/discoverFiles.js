import fs from "fs/promises";
import path from "path";

export async function discoverFiles(directory) {
  const subtitleFiles = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      // Ignore macOS metadata
      if (
        entry.name.startsWith("._") ||
        entry.name === ".DS_Store"
      ) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        const extension = path.extname(entry.name).toLowerCase();

        if (extension === ".vtt" || extension === ".srt") {
          subtitleFiles.push(fullPath);
        }
      }
    }
  }

  await walk(directory);

  return subtitleFiles;
}