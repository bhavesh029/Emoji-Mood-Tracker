import { emoji-trackerServer } from "@emojiTracker-js/emoji-tracker-lib";

import serverless from "serverless-http";

module.exports.handler = function (evt, ctx) {
  return new emoji-trackerServer().app
    .then((app) => {
      return serverless(app, { provider: "aws" })(evt, ctx);
    })
    .catch((err) => console.log(err));
};
