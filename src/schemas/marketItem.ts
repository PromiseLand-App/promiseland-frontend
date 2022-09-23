import { BigNumber } from 'ethers';

export interface MarketItem {
  tokenId: BigNumber;
  seller: string;
  owner: string;
  price: BigNumber;
  upvotes: BigNumber;
  downvotes: BigNumber;
  sold: boolean;
}
