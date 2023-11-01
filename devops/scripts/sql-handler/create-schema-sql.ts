import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

function createSchemaFile() {
  // Get command-line arguments
  const args = process.argv.slice(2);

  let sqlDir;
  // Check if arguments are provided
  if (args.length !== 1) {
    console.error('command-line argument is not provided [sqlDir]');
  } else {
    sqlDir = args[0];
    console.log(sqlDir);
  }

  // Define the file path
  const filePath = sqlDir + '/v1.0.0-00-create-schema.sql';
  const DbSchemaKey = 'DB_SCHEMA';
  const dbSchema = process.env[DbSchemaKey];

  if (dbSchema == undefined) {
    throw new Error(`Env KEY: ${DbSchemaKey} is not undefined`);
  }

  // Define the text to write into the file
  const fileContent = `\\connect postgres \ncreate schema ${dbSchema};`;

  // Write the text to the file
  fs.writeFileSync(filePath, fileContent);

  console.log(`Text successfully written to ${filePath}`);
}

createSchemaFile();
