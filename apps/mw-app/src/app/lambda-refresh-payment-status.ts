import { aggregaterRatings } from "@emojiTracker-js/emoji-tracker-lib";

exports.handler = async function (event, context, callback) {
  await aggregaterRatings(true);
};
