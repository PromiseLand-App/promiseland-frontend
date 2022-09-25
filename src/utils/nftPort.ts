import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { chainId } from 'wagmi';

import { NFT } from '@/schemas/nft';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_NFTPORT_API_KEY as string,
    },
  }).then((res) => res.json());

export const SUPPORTED_CHAINS: { [key in number]: string } = {
  [chainId.mainnet]: 'ethereum',
  [chainId.rinkeby]: 'rinkeby',
  [chainId.goerli]: 'goerli',
  [chainId.polygon]: 'polygon',
};

export const useOwnedNFTs = (chain: string, address: string) => {
  const getOwnedNFTsKey = useCallback(
    (pageIndex: number, previousPageData?: { continuation?: string }) => {
      if (previousPageData && !previousPageData.continuation) return null;
      return `https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&include=metadata${
        previousPageData?.continuation
          ? `&continuation=${previousPageData.continuation}`
          : ''
      }`;
    },
    [address, chain],
  );

  const {
    data: raw,
    setSize,
    ...res
  } = useSWRInfinite(getOwnedNFTsKey, fetcher);

  const data = useMemo(() => {
    if (!raw) return undefined;
    const nfts: NFT[][] = raw.map((each: { nfts: any[] }) =>
      each.nfts.map(
        (nft) =>
          ({
            contractAddress: nft.contract_address,
            tokenId: nft.token_id,
            owner: address,
            fileUrl: nft.cached_file_url || nft.file_url,
          } as NFT),
      ),
    );

    return nfts;
  }, [address, raw]);

  const hasNextPage = useMemo(
    () => (raw ? Boolean(raw[raw.length - 1]?.continuation) : false),
    [raw],
  );

  return { data, hasNextPage, setSize, ...res };
};
