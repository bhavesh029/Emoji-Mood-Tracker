import * as fs from 'fs';
import * as readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function setUpEnv() {
  const envType = process.argv;
  console.log('this is envType', envType[3]);
  const hashMap = new Map<string, string>();
  const credData = loadEnv(process.cwd() + `/creds/${envType[3]}.cred`, true);
  const envFilesDir = '/devops/files/env-files';
  const baseEnvData = loadEnv(process.cwd() + envFilesDir + '/base.env');
  const envdata = loadEnv(process.cwd() + `${envFilesDir}/${envType[3]}.env`);

  loadFilesIntoMap(baseEnvData, envdata, credData, hashMap);

  const file = fs.createWriteStream('.env');
  file.on('error', function (err) {
    console.log(err);
  });
  //Inserting Base Env and Choosen Env Data
  const profile = `PROFILE=${envType[3]}`;

  file.write(`# ENVIRONMENT\r\n`);
  file.write(`${profile}\r\n`);
  hashMap.forEach((value, key) => {
    if (key.startsWith('#')) {
      file.write(`\n${key}\n`);
    } else if (key == '') {
      console.log('skipping undefined data');
    } else {
      file.write(`${key}=${value}\r\n`);
    }
  });
  file.end();

  console.log('Your .env file has been created!');

  rl.close();
}

function loadFilesIntoMap(
  baseEnvData: string[],
  profileEnvData: string[],
  credData: string[],
  hashMap: Map<string, string>
): Map<string, string> {
  loadFileIntoMap(baseEnvData, hashMap);
  loadFileIntoMap(profileEnvData, hashMap);
  loadFileIntoMap(credData, hashMap);

  return hashMap;
}

function loadFileIntoMap(envData: string[], hashMap: Map<string, string>) {
  if (envData.length > 1) {
    envData.map((data) => {
      if (data.startsWith('#')) {
        hashMap.set(data, data);
      } else {
        const [first, ...rest] = data.split('=');
        hashMap.set(first, rest.join('='));
      }
    });
  } else {
    console.error('Did not find any data in env');
  }
}

function loadEnv(file: string, skipIfNotAvailable = false): string[] {
  console.log(`Reading env file - ${file}`);

  if (fs.existsSync(file)) {
    return fs.readFileSync(file).toString().replaceAll(/\r/g, '').split('\n');
  } else {
    if (skipIfNotAvailable) {
      console.log(`File: ${file} not found, hence skipping`);
      return [];
    } else {
      throw new Error(`File: ${file} doesn't exists`);
    }
  }
}

setUpEnv();
