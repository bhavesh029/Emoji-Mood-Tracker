/* eslint-disable */

import { setTimezone } from "@emojiTracker-js/data-access";
setTimezone();
export default {
  displayName: "mw-app",
  preset: "../../jest.preset.js",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  testTimeout: 20000,
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/apps/mw-app",
};
