const fs = require('fs');
const buildPath = '.build/';
const lambdaPreFilesPath = '.lambda/pre-files/';
fs.rmSync(buildPath, { force: true, recursive: true });
fs.mkdirSync(buildPath);
fs.cpSync(lambdaPreFilesPath, buildPath, { recursive: true, force: true });
const webpackConfigFile = 'webpack.config.js';
fs.cpSync(webpackConfigFile, buildPath + 'webpack.config.js');
