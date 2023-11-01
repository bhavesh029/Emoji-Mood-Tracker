/* eslint-disable */

import { setTimezone } from "@emojiTracker-js/data-access";

setTimezone();
export default {
  displayName: "emoji-tracker-lib",
  preset: "../../jest.preset.js",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/libs/emoji-tracker-lib",
  testTimeout: 20000,
  testEnvironment: "node",
};
