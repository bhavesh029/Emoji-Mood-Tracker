import { getJestProjects } from "@nrwl/jest";
import { setTimezone } from "@emojiTracker-js/data-access";
setTimezone();
export default {
  projects: getJestProjects(),
};
