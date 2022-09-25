import { formatEther } from 'ethers/lib/utils';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useAccount, useContractRead } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';
import IPost from '@/schemas/post';
import { trimAddress } from '@/utils/helper';

import BuyButton from './BuyButton';
import SellButton from './SellButton';

export default function NftPanel({ tokenId }: { tokenId: number }) {
  const { address } = useAccount();
  const promiseLand = usePromiseLandContractMeta();

  const { data: uri, isLoading: isLoadingUri } = useContractRead({
    ...promiseLand,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  const { data: nft } = useContractRead({
    ...promiseLand,
    functionName: 'fetchNftById',
    args: [tokenId],
    watch: true,
  });

  const { data: meta, isValidating: isLoadingMeta } = useSWR(uri);

  const post = useMemo(
    () =>
      !meta
        ? undefined
        : ({
            image: meta.image,
            name: meta.name,
            description: meta.description,
          } as unknown as IPost),
    [meta],
  );

  if (isLoadingUri || isLoadingMeta) return <>Loading...</>;
  if (!post) return null;

  return (
    <div className="flex flex-wrap rounded-lg border py-10 shadow">
      {post.image && (
        <img
          src={post.image}
          alt={post.creator}
          className="w-full object-contain lg:w-3/5"
        />
      )}

      <div className="w-full p-5 lg:w-2/5">
        <h2 className="mt-1 text-base ">Name: </h2>
        <p className="my-2 text-3xl font-bold"> {meta.name}</p>
        <h2 className="my-1 text-base">Description: </h2>
        <p className="my-2 text-base font-bold"> {meta.description}</p>
        <div className="font-bold">It has {nft?.likes.toString()} likes</div>
        <div className="my-1 flex flex-row items-center">
          <h2 className="text-base">Selling at: </h2>
          <p className="ml-2 text-sm text-sky-600">
            {' '}
            {nft?.selling ? `${formatEther(nft?.price ?? 0)} eth` : 'N/A'}
          </p>
        </div>
        <div className="flex flex-row">
          <h2 className="my-1 text-base">Created by: </h2>
          {nft?.creator == address ? (
            <a href={`/profile/${nft?.creator}`}>
              <p className="ml-2 mt-1 text-sm text-sky-600"> you</p>
            </a>
          ) : (
            <a href={`/profile/${nft?.creator}`}>
              <p className="ml-2 mt-1 text-sm text-sky-600">
                {' '}
                {trimAddress(nft?.creator, 6, 4)}
              </p>
            </a>
          )}
        </div>
        <div className="flex flex-row">
          <h2 className="my-1 text-base">Owner by:</h2>
          {nft?.owner == address ? (
            <a href={`/profile/${nft?.owner}`}>
              <p className="ml-2 mt-1 text-sm text-sky-600"> you</p>
            </a>
          ) : (
            <a href={`/profile/${nft?.owner}`}>
              <p className="ml-2 mt-1 text-sm text-sky-600">
                {' '}
                {trimAddress(nft?.owner, 6, 4)}
              </p>
            </a>
          )}
        </div>

        <div className="my-2">
          {nft?.owner == address ? (
            <SellButton marketItem={nft as unknown as MarketItem} />
          ) : nft?.isSelling ? (
            <BuyButton marketItem={nft as unknown as MarketItem} />
          ) : null}
        </div>

        {/* <a
          className="rounded-lg bg-sky-200 py-1 px-2"
          href={'https://testnets.opensea.io/' + tokenId}
          target={'_blank'}
          rel="noreferrer"
        >
          Checkout in opensea
        </a> */}
      </div>
    </div>
  );
}
