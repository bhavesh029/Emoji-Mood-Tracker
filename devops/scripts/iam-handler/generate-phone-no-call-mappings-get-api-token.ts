import { emoji-trackerApplicationId } from "@emojiTracker-js/data-access";
import {
  env,
  NumberMaskingServiceProvider,
} from "@emojiTracker-js/milkyway-common";
import { getConnectionDbCtx } from "@emojiTracker/blackhole-common";
import { generateAndStoreSession } from "@emojiTracker/iam";
import { PhoneNoCallMappingsUserId } from "libs/milkyway-common/src/constants/phone-no-call-mappings-constant";

function generateToken() {
  return getConnectionDbCtx().then((dbCtx) => {
    return generateAndStoreSession(
      dbCtx,
      PhoneNoCallMappingsUserId,
      env(NumberMaskingServiceProvider),
      emoji-trackerApplicationId
    ).then(() => process.exit(0));
  });
}

generateToken();
