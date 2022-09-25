import { BigNumberish } from 'ethers';

interface IPost {
  id: string;
  username: string;
  profile: string;
  image: string;
  name: string;
  description: string;
  likes: string;
  createdAt: string;
  action: string;
  data: any;
  creator: string;
  tokenId: BigNumberish;
}

export default IPost;
