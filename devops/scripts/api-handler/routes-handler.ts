import regexReplace from "regex-replace";

const options = {
  filenamesOnly: false, //default
  fileContentsOnly: true, //default
};

const files: string[] = [
  `libs/emoji-tracker-lib/src/api/routes.ts`,
  `libs/customer-lib/src/api/routes.ts`,
];

files.map((file) => {
  regexReplace(
    "app: Router",
    "app: Router, ctrlCtx: ControllerContext",
    file,
    options
  )
    .then(() =>
      regexReplace("Controller\\(\\)", "Controller(ctrlCtx)", file, options)
    )
    .then(() =>
      regexReplace(
        "./../../../milkyway-common/src/api/controllers.*",
        "@emojiTracker-js/milkyway-common';",
        file,
        options
      )
    )
    .then(() =>
      regexReplace(
        "import type { RequestHandler, Router } from 'express';",
        `import { ControllerContext } from '@emojiTracker-js/data-access';\nimport type { RequestHandler, Router } from 'express';`,
        file,
        options
      )
    )
    .then(() =>
      regexReplace(
        "response.status\\(statusCode \\|\\| 204\\).end\\(\\);",
        "response.status(statusCode || 204).json();",
        file,
        options
      )
    )
    .then(() =>
      regexReplace(
        "response.status\\(statusCode \\|\\| 200\\).json\\(data\\);",
        `console.log('response headers', headers);
       if (
         headers != undefined &&
         headers['Content-Type'] == 'text/plain'
       ) {
         response.status(statusCode || 200).send(data);
       } else {
         response.status(statusCode || 200).json(data);
       }`,
        file,
        options
      )
    )
    .then(() => {
      console.log(`${file}: Routes Handling Done`);
    });
});
