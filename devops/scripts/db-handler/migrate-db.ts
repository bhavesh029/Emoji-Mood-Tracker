import fs from 'fs';
import path from 'path';
import * as product from '../../../package.json';

// Get command-line arguments
const args = process.argv.slice(2);

let sqlDir;
let migrationDir;
// Check if arguments are provided
if (args.length !== 2) {
  console.error(
    'All command-line arguments are not provided [sqlDir, migrationDir]'
  );
} else {
  sqlDir = args[0];
  console.log(sqlDir);
  migrationDir = args[1];
  console.log(migrationDir);
}

deleteAndCreateMigrationDir();

const migrationFiles = readMigrationFiles(sqlDir);
console.log(migrationFiles);

function deleteAndCreateMigrationDir() {
  if (fs.existsSync(migrationDir)) {
    fs.rmSync(migrationDir, { recursive: true });
  }

  fs.mkdirSync(migrationDir);
}

function readMigrationFiles(folderPath: string): string[] {
  const currentVersion: string = product['version'];
  const previousVersion: string = product['previous-version'];

  const files = fs.readdirSync(folderPath);
  const filteredFiles = files.filter((file) => {
    console.log(`fileName is ${file}`);
    const fileName = path.basename(file);
    const pattern = /^(v\d+\.\d+\.\d+)-.*\.sql$/;
    const fileVersion = fileName.match(pattern)?.[1];
    const readOrNot =
      (fileVersion &&
        fileVersion > previousVersion &&
        fileVersion <= currentVersion) ||
      fileVersion == 'v99.99.999';
    console.log(
      `fileVersion is ${fileVersion} | previousVersion is ${previousVersion} | currentVersion is ${currentVersion} | readOrNot ${readOrNot}`
    );
    return readOrNot;
  });

  filteredFiles.map((fileName) => {
    fs.renameSync(`${sqlDir}/${fileName}`, `${migrationDir}/${fileName}`);
  });

  return filteredFiles;
}
