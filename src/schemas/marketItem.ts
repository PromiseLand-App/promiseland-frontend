import { BigNumber } from 'ethers';

export interface MarketItem {
  tokenId: BigNumber;
  creator: string;
  owner: string;
  price: BigNumber;
  upvotes: BigNumber;
  downvotes: BigNumber;
  sold: boolean;
}
