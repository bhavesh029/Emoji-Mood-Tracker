import {
  capitalizeStatement,
  insertIntoPersonalDetails,
  emoji-trackerApplicationId,
  emoji-trackerSelectedServicesReqBody,
  prepareTestDbCtx,
  saveServicesInemoji-tracker,
  SelectedServicesReqBody,
  testContext,
  truncateAllTables,
} from "@emojiTracker-js/data-access";
import {
  Onboardingemoji-trackerPhoneNo1,
  Owneremoji-trackerPhoneNo,
  Professionalemoji-trackerPhoneNo,
} from "@emojiTracker-js/milkyway-common";
import {
  addTeamMember,
  getShopJoinCode,
} from "@emojiTracker-js/emoji-tracker-lib";
import { getConnectionDbCtx } from "@emojiTracker/blackhole-common";
// import { PermittedResource } from '@emojiTracker/iam/src/services/models/permitted-resource';
import { writeFile } from "fs/promises";
import {
  ManagerRole,
  OnboardingRole,
  OwnerRole,
  ProfessionalRole,
} from "@emojiTracker-js/data-access";
import { saveemoji-trackerDetails } from "libs/emoji-tracker-lib/src/services/mobile-otp-services";
import { handleSessionAndAdditionalInfo } from "libs/emoji-tracker-lib/src/services/emoji-tracker-info-session-manager";
import { shopServices } from "libs/emoji-tracker-lib/src/services/shops-services";
const deviceId = "androidid";
type TokenInfo = {
  token: string;
  emoji-trackerId: string;
  roleId: string;
  // permissions: PermittedResource[];
};
function getCtx() {
  return getConnectionDbCtx().then((dbCtx) => prepareTestDbCtx(dbCtx));
}
const ownerPersonalDetails = {
  dob: "01-01-1995",
  pin: "",
  gender: "m",
  fullName: "Owner Name",
  gstNumber: "string",
  workingSince: 2019,
  presentAddress: {
    state: "Karnataka",
    country: "India",
    pincode: 123,
    district: "300560",
    localityOrArea: "string",
    houseOrFlatNumber: "string",
    houseOrBuildingName: "string",
  },
};
const proffesionalPersonalDetails = {
  dob: "01-01-1965",
  pin: "",
  gender: "m",
  fullName: "Proffessional Name",
  gstNumber: "string",
  workingSince: 2019,
  presentAddress: {
    state: "Karnataka",
    country: "India",
    pincode: 123,
    district: "300560",
    localityOrArea: "string",
    houseOrFlatNumber: "string",
    houseOrBuildingName: "string",
  },
};
const managerPersonalDetails = {
  dob: "01-01-1975",
  pin: "",
  gender: "m",
  fullName: "Manager Name",
  gstNumber: "string",
  workingSince: 2019,
  presentAddress: {
    state: "Karnataka",
    country: "India",
    pincode: 123,
    district: "300560",
    localityOrArea: "string",
    houseOrFlatNumber: "string",
    houseOrBuildingName: "string",
  },
};
let Exit = false;
async function dumpemoji-trackerTestSession() {
  const mwCtx = await getCtx();
  await truncateAllTables(mwCtx);
  const onboardingInfo = {
    info: await saveemoji-trackerDetails(
      mwCtx.mwDbCtx,
      Onboardingemoji-trackerPhoneNo1.toString(),
      OnboardingRole.id
    ).then((id) => {
      const info = {
        userId: id,
        roleId: OnboardingRole.id,
        currentState: "PHONE-NO-VERIFIED",
        hasAcceptedPolicies: true,
      };
      return handleSessionAndAdditionalInfo(
        info,
        deviceId,
        mwCtx,
        emoji-trackerApplicationId
      );
    }),
    roleId: OnboardingRole.id,
  };
  let ownerIdWithShop;
  const owneremoji-trackerInfo = {
    info: await saveemoji-trackerDetails(
      mwCtx.mwDbCtx,
      Owneremoji-trackerPhoneNo.toString(),
      OwnerRole.id
    ).then((id) => {
      ownerIdWithShop = id;

      const subCategoriesServices: SelectedServicesReqBody = {
        subCategoriesId: [
          "bicycle-puncture",
          "two-wheeler-washing",
          "shoe-general-repair",
        ],
      };
      const services: emoji-trackerSelectedServicesReqBody = {
        services: subCategoriesServices,
      };

      return saveServicesInemoji-tracker(mwCtx.mwDbCtx, id, services).then(() =>
        shopServices
          .addShopNameAndemoji-trackerRole(
            mwCtx.mwDbCtx,
            capitalizeStatement(`${testContext.testIdentifier}+ testShopName`),
            id
          )
          .then(() =>
            insertIntoPersonalDetails(mwCtx.mwDbCtx, ownerPersonalDetails, id)
          )
          .then(() => {
            const info = {
              userId: id,
              roleId: OnboardingRole.id,
              currentState: "PHONE-NO-VERIFIED",
              hasAcceptedPolicies: true,
            };
            return handleSessionAndAdditionalInfo(
              info,
              deviceId,
              mwCtx,
              emoji-trackerApplicationId
            );
          })
      );
    }),
    roleId: OwnerRole.id,
  };
  const manageremoji-trackerInfo = {
    info: await saveemoji-trackerDetails(
      mwCtx.mwDbCtx,
      Professionalemoji-trackerPhoneNo.toString(),
      ManagerRole.id
    ).then((id) =>
      insertIntoPersonalDetails(mwCtx.mwDbCtx, ownerPersonalDetails, id).then(
        () => {
          const info = {
            userId: id,
            roleId: OnboardingRole.id,
            currentState: "PHONE-NO-VERIFIED",
            hasAcceptedPolicies: true,
          };
          return handleSessionAndAdditionalInfo(
            info,
            deviceId,
            mwCtx,
            emoji-trackerApplicationId
          );
        }
      )
    ),
    roleId: ManagerRole.id,
  };
  const professionalemoji-trackerInfo = {
    info: await saveemoji-trackerDetails(
      mwCtx.mwDbCtx,
      Professionalemoji-trackerPhoneNo.toString(),
      OnboardingRole.id
    ).then((id) =>
      getShopJoinCode(mwCtx.mwDbCtx, id)
        .then((res) => addTeamMember(mwCtx, ownerIdWithShop, res.shopJoinCode))
        .then(() =>
          insertIntoPersonalDetails(
            mwCtx.mwDbCtx,
            proffesionalPersonalDetails,
            id
          )
        )
        .then(() => {
          const info = {
            userId: id,
            roleId: OnboardingRole.id,
            currentState: "PHONE-NO-VERIFIED",
            hasAcceptedPolicies: true,
          };
          return handleSessionAndAdditionalInfo(
            info,
            deviceId,
            mwCtx,
            emoji-trackerApplicationId
          );
        })
    ),
    roleId: ProfessionalRole.id,
  };
  const infos = [
    owneremoji-trackerInfo,
    onboardingInfo,
    manageremoji-trackerInfo,
    professionalemoji-trackerInfo,
  ].map((x) => {
    const tokenInfo: TokenInfo = {
      token: x.info.token,
      emoji-trackerId: x.info.emoji-trackerId,
      // permissions: x.info.permissions,
      roleId: x.roleId,
    };
    return tokenInfo;
  });
  const content = JSON.stringify(infos, null, 3);
  await writeFile("./tmp/test-token.json", content).then(() => {
    Exit = true;
  });
  process.exit(0);
}

dumpemoji-trackerTestSession();
