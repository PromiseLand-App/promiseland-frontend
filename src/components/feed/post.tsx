import { Skeleton } from '@mui/material';
import { formatEther } from 'ethers/lib/utils';
import Link from 'next/link';
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
    watch: true,
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

  if (!post) return null;

  return (
    <div className="relative mx-auto max-w-[30rem] items-center space-y-4 rounded-lg border-[1px] border-gray-300 bg-white p-4 px-5">
      {/* Heading */}
      {isLoadingUri || isLoadingMeta ? (
        <>
          <div className="flex flex-row">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton
              variant="rectangular"
              width={200}
              height={32}
              sx={{ marginLeft: 2 }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="-m-2 flex items-center gap-3">
              <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
                {ensAvatar ? (
                  <Image
                    className="h-full w-full object-cover"
                    src={ensAvatar}
                    alt={post.profile}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-pink-400 via-fuchsia-300 to-sky-500 text-xs text-white">
                    {(ensName ?? post.creator.slice(2)).slice(0, 2)}
                  </div>
                )}
              </div>
              <Link href={`/profile/${post.creator}`}>
                <a>
                  <h2 className="font-semibold">
                    {ensName ?? trimAddress(post.creator)}
                  </h2>
                </a>
              </Link>
              <h2 className="text-xs font-semibold text-slate-500">
                Just created
              </h2>
            </div>
          </div>
        </>
      )}
      {/* Posted Image */}
      {isLoadingUri || isLoadingMeta ? (
        <>
          <Skeleton variant="rectangular" width={420} height={420} />
        </>
      ) : (
        <>
          <div className="relative -mx-5 overflow-hidden">
            <Link href={`/post/${post.tokenId}`}>
              <a>
                <Image
                  className="w-full"
                  src={post.image}
                  alt={post.username}
                />
              </a>
            </Link>
          </div>
        </>
      )}
      {/* Actions */}
      {isLoadingUri || isLoadingMeta ? (
        <>
          <Skeleton
            variant="rectangular"
            width={200}
            height={32}
            sx={{ marginLeft: 2 }}
          />
        </>
      ) : (
        <>
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
            {nft && (
              <span className=" font-semibold">{`${nft.likes} likes`}</span>
            )}
            <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
          </div>
          <div className="flex gap-4">
            <EmojiCollection />
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Add a comment (Coming soon)"
            />
            <button className="text-blue-500">Post</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostItem;
