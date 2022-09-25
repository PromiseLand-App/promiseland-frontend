import { formatEther } from 'ethers/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useContractRead, useEnsAvatar, useEnsName } from 'wagmi';

import {
  BookmarkIcon,
  EmojiCollection,
  MessageIcon,
  ShareIcon,
} from '@/assets/icons';
import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';
import IPost from '@/schemas/post';
import { trimAddress } from '@/utils/helper';

import Image from '../Image';
import LikeButton from '../LikeButton';

interface PostItemProps {
  item: MarketItem;
}

const PostItem = ({ item }: PostItemProps) => {
  const router = useRouter();
  const promiseLand = usePromiseLandContractMeta();

  const { data: uri, isLoading: isLoadingUri } = useContractRead({
    ...promiseLand,
    functionName: 'tokenURI',
    args: [item.tokenId],
  });

  const { data: nft } = useContractRead({
    ...promiseLand,
    functionName: 'fetchNftById',
    args: [item.tokenId],
  });

  const { data: meta, isValidating: isLoadingMeta } = useSWR(uri);
  const { data: ensName } = useEnsName({ address: item.creator });
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: item.creator });

  const price = useMemo(() => formatEther(item.price.toString()), [item.price]);
  const post = useMemo(
    () =>
      !meta
        ? undefined
        : ({
            price,
            tokenId: item.tokenId,
            creator: item.creator,
            owner: item.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          } as unknown as IPost),
    [meta, item.owner, item.creator, item.tokenId, price],
  );

  if (isLoadingUri || isLoadingMeta) return <>Loading...</>;
  if (!post) return null;

  return (
    <div className="relative mx-auto max-w-[30rem] space-y-4 rounded-lg border-[1px] border-gray-300 bg-white p-4 px-5">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="-m-2 flex items-center gap-3">
          {/* <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
            <img className="w-full" src={ensAvatar} alt={post.profile} />
          </div> */}
          <Link href={`/profile/${post.creator}`}>
            <a>
              <h2 className="font-semibold">
                {ensName ?? trimAddress(post.creator)}
              </h2>
            </a>
          </Link>
          <h2 className="text-xs font-semibold text-slate-500">just create</h2>
        </div>
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 overflow-hidden">
        <Link href={`/post/${post.tokenId}`}>
          <a>
            <Image className="w-full" src={post.image} alt={post.username} />
          </a>
        </Link>
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">{post.name}</span>
          <br />

          {post.description}
        </p>
        <div className="mb-2 flex justify-between">
          <div className="flex items-center gap-4">
            <LikeButton tokenId={post.tokenId} />
            <MessageIcon />
            <ShareIcon />
          </div>
          <BookmarkIcon />
        </div>
        {nft && <span className=" font-semibold">{`${nft.likes} likes`}</span>}
        <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
      </div>

      <div className="relative inset-x-0 -mx-5 h-[1px] bg-gray-200"></div>

      <div className="flex gap-4">
        <EmojiCollection />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Add a comment (Comming soon)"
        />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default PostItem;
