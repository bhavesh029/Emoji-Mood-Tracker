export type CustomerVersionInfo = {
  version: string;
  createdTimestamp: Date;
  updatedTimeStamp: Date;
  versionMetadata: CustomerVersionMetadata;
};

export type CustomerVersionMetadata = {
  versionCompatibility: CustomerVersionCompatibility;
  cacheInfos: CustomerCacheInfo[];
  directories: CustomerDirectories;
};

export type CustomerVersionCompatibility = {
  minVersion: string;
  maxVersion: string;
};

export type CustomerCacheInfo = {
  category: string;
  cacheHash: string;
};

export type CustomerDirectories = {
  policyDir: string;
  themeBaseUrl: string;
  customerProfilePicUrl: string;
  customerProfilePicBucket: string;
  customerProfilePicDir: string;
  partnerProfilePicUrl: string;
  partnerProfilePicBucket: string;
  partnerProfilePicDir: string;
  shopLogoUrl: string;
  shopLogoDir: string;
  themesDir: string;
  shopLogoBucket: string;
  languageIconsDir: string;
  serviceCateogryIconsDir: string;
  appIconsDir: string;
  appIllustrationsDir: string;
  adsDir: string;
  serviceCategoryIconsVer2Dir: string;
};
