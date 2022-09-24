import { useMemo } from 'react';
import useSWR from 'swr';
import { useContractRead } from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';
import IPost from '@/schemas/post';

export default function NftPanel({ tokenId }: { tokenId: number }) {
  const { data: uri, isLoading: isLoadingUri } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  const { data: nft } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
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
    <div className="flex rounded-lg border py-10 pr-20 shadow">
      {post.image && (
        <img
          src={post.image}
          alt={post.creator}
          className="aspect-h w-3/5 border "
        />
      )}
      <div className="p-5">
        <div className="m-2">Created by: {nft?.creator}</div>
        <div className="m-2">Owner by: {nft?.owner}</div>
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
