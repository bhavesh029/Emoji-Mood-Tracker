export type PartnerVersionInfo = {
  version: string;
  createdTimestamp: Date;
  updatedTimeStamp: Date;
  versionMetadata: PartnerVersionMetadata;
};

export type PartnerVersionMetadata = {
  versionCompatibility: PartnerVersionCompatibility;
  cacheInfos: PartnerCacheInfo[];
  directories: PartnerDirectories;
};

export type PartnerVersionCompatibility = {
  minVersion: string;
  maxVersion: string;
};

export type PartnerCacheInfo = {
  category: string;
  cacheHash: string;
};

export type PartnerDirectories = {
  policyDir: string;
  themeBaseUrl: string;
  profilePicUrl: string;
  profilePicDir: string;
  shopLogoUrl: string;
  shopLogoDir: string;
  themesDir: string;
  shopLogoBucket: string;
  invoiceBucket: string;
  invoiceDir: string;
  invoiceUrl: string;
  profilePicBucket: string;
  languageIconsDir: string;
  serviceCateogryIconsDir: string;
  appIconsDir: string;
  appIllustrationsDir: string;
};
