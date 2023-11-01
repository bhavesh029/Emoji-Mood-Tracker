import { env } from "@emojiTracker-js/milkyway-common";

const args = process.argv.slice(2);

function deploy() {
  let type;
  // Check if arguments are provided
  if (args.length !== 1) {
    console.error("All command-line arguments are not provided - [type]");
  } else {
    type = args[0];
    console.log(`Setting up lambda files for: ${type}`);
  }

  const fs = require("fs");

  const serverlessFileName = "serverless.yml";
  const webpackFileName = "webpack.config.js";
  try {
    fs.unlinkSync(serverlessFileName);
  } catch (e) {
    console.log("No serverless file to delete");
  }

  try {
    fs.unlinkSync(webpackFileName);
  } catch (e) {
    console.log("No webpack file to delete");
  }

  const profile = env("PROFILE");
  const baseDir = "devops/files/lambda-serverless-files";
  const serverlessFile = `${baseDir}/${profile}/${type}-serverless.yml`;
  fs.cpSync(serverlessFile, serverlessFileName, { force: true });

  const webpackConfigFile = `${baseDir}/webpack.config.js`;
  fs.cpSync(webpackConfigFile, webpackFileName, {
    force: true,
  });

  console.log("Lambda files setup done");
}

deploy();
