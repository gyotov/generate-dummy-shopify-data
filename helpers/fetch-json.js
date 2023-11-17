import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function fetchJson(type) {
  return new Promise((resolve, _) => {
    fs.readFile(
      `${path.resolve(__dirname, "../", "resources")}/${type}.json`,
      "utf-8",
      (error, data) => {
        if (error)
          resolve({
            error: "Unable to open file",
            message: error.message,
          });

        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          resolve({
            error: `Invalid json with type: ${type}`,
            message: e.message,
          });
        }
      }
    );
  });
}
