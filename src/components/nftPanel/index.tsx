import { useMemo } from 'react';
import useSWR from 'swr';
import { useContractRead } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import IPost from '@/schemas/post';
import { trimAddress } from '@/utils/helper';

export default function NftPanel({ tokenId }: { tokenId: number }) {
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
        <h2 className="my-1 text-base">Created by: </h2>
        <p className="my-2 text-sm text-sky-600">
          {' '}
          {trimAddress(nft?.creator, 6, 4)}
        </p>
        <h2 className="my-1 text-base">Owner by:</h2>
        <p className="my-2 text-sm text-sky-600">
          {' '}
          {trimAddress(nft?.owner, 6, 4)}
        </p>
        <div className="m-2">It has {nft?.likes.toString()} likes</div>
        <a
          className="rounded-lg bg-sky-200 py-1 px-2"
          href={'https://testnets.opensea.io/' + tokenId}
          target={'_blank'}
          rel="noreferrer"
        >
          Checkout in opensea
        </a>
      </div>
    </div>
  );
}
