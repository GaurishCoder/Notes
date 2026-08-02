import path from "path";

export function extractMetadata(filePath) {
  const normalized = path.normalize(filePath);
  const parts = normalized.split(path.sep);

  return {
    course: parts[parts.indexOf("mobile-dev-course")],
    module: parts[parts.indexOf("mobile-dev-course") + 1],
    lecture: parts[parts.length - 2],
    source: path.basename(filePath),
  };
}