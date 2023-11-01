import regexReplace from "regex-replace";

const searchString = "(\n( +)schema:.*)";
const replaceString = "";

const options = {
  filenamesOnly: false, //default
  fileContentsOnly: true, //default
};

const dir: string = `libs/data-access/src/dao/models`;
const fs = require("fs");

fs.readdir(dir, (err, files) => {
  files.forEach((file) => {
    console.log(file);
    doChanges(dir, file)
      .then(() => {
        console.log(`file ${file} changes done`);
      })
      .catch((err) => {
        console.error("err > regexReplace > testing", err);
      });
  });
});

function doChanges(dir: string, file: any) {
  return regexReplace(
    searchString,
    replaceString,
    `${dir}/${file}`,
    options
  ).then(() => {
    const from = 'import type { Sequelize } from "sequelize";';
    const to = 'import type { Sequelize } from "sequelize";';
    return regexReplace(from, to, `${dir}/${file}`, options);
  });
}
