/* eslint-disable */

import { setTimezone } from "@emojiTracker-js/data-access";
setTimezone();
export default {
  displayName: "data-access",
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
  coverageDirectory: "../../coverage/libs/data-access",
  testTimeout: 20000,
  testEnvironment: "node",
};
