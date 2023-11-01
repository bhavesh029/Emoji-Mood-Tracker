import fs from "fs";
import path from "path";
import * as pack from "../../../package.json";
import { env } from "@emojiTracker-js/milkyway-common";
// Define the file path
const filePath = ".db-sqls/sqls.txt";

// Define the destination directory
const destinationDir = ".db-sqls";

// Read the file paths from the text file
const data = fs.readFileSync(filePath, "utf8");
console.log(data);
const dbSchema = env<string>("DB_SCHEMA");
// Split the file paths by newlines
const filePaths = data.split("\n");

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir);
}
let count = 1;
// Copy and rename files
filePaths.forEach((filePath) => {
  // Trim any whitespace from the file path
  filePath = filePath.trim();

  // Check if the file path is not empty
  let newFilePath;
  if (filePath) {
    const fileName = path.basename(filePath);
    // Check if the file name matches "ddl"
    if (fileName === "ddl.sql") {
      const parent = path.dirname(filePath).replace("./", "");
      newFilePath = path.join(
        destinationDir,
        `v1.0-${count}-${parent}-${fileName}`
      );
      count += 1;
    } else {
      newFilePath = path.join(destinationDir, fileName);
    }
    const content = fs
      .readFileSync(filePath)
      .toString()
      .replace(/\$schema/g, dbSchema)
      .replace(/\$db/g, "postgres");
    fs.writeFileSync(newFilePath, content);
    console.log(`File ${filePath} copied to ${newFilePath}`);
  }
});
console.log("done flattening");
