export type DealDetails = {
  deals: Deal[];
};

export type Deal = {
  dealStatus: string;
  noOfDeals: number;
  totalDealAmount: string;
};

export type Ratings = {
  overallRating?: string;
  qualityRating?: string;
  behaviourRating?: string;
};

export type FetchedDeals = {
  dealStatus: string;
  noOfDeals: number;
  totalDealAmount: string;
  behaviourRating: string;
  qualityRating: string;
};
