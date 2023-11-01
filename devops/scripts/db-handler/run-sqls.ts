import { env } from "@emojiTracker/blackhole-common";
import fs from "fs";
import path from "path";
import { Pool, Client } from "pg";

// Create a Sequelize instance with your PostgreSQL database configuration
const connectionString = env<string>("DATABASE_URL");

// Function to execute a single .sql file
const client = new Client({
  connectionString,
});

function executeSqlFile(filePath: string, client: Client): Promise<void> {
  // Read the .sql file content
  return (
    fs.promises
      .readFile(filePath, "utf8")
      .then((sqlString) => {
        const content = sqlString.replace(/^\\c.*$/gm, "");
        return content;
      })
      .then((queries) => {
        return client.query(queries).catch((e) => {
          console.error(e);
          throw e;
        });
      })
      .then(() => {
        console.log(`Executed ${filePath} successfully`);
      })
      // .then(() => process.exit(0))
      .catch((e) => {
        console.error(e);
        throw e;
      })
  );
}

// Function to read .sql files from a directory and execute them
async function executeSqlFilesFromDirectory(
  directoryPath: string
): Promise<void> {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Read the files from the directory
    const files = await fs.promises.readdir(directoryPath);

    // Process each file
    for (const file of files) {
      // Check if the file has a .sql extension
      if (path.extname(file) === ".sql") {
        const filePath = path.join(directoryPath, file);
        await executeSqlFile(filePath, client);
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  } finally {
    client.end();
  }
}

// Usage example
const directoryPath = ".migrate";
executeSqlFilesFromDirectory(directoryPath);
