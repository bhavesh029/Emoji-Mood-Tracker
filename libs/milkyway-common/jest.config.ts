/* eslint-disable */
import { setTimezone } from "@emojiTracker-js/data-access";
setTimezone();
export default {
  displayName: "milkyway-common",
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
  coverageDirectory: "../../coverage/libs/milkyway-common",
  testTimeout: 20000,
  testEnvironment: "node",
};
