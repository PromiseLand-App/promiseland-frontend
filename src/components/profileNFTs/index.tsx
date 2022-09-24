import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import useChainId from '@/hooks/useChainId';
import { SUPPORTED_CHAINS } from '@/utils/nftPort';

import BroughtNFTs from './BroughtNFTs';
import CreatedNFTs from './CreatedNFTs';
import OwnedNFTs from './OwnedNFTs';

const makeTabClasses = ({ selected }: { selected: boolean }) =>
  clsx(
    'border-b px-4 py-2',
    selected ? 'border-b-black' : 'border-b-transparent',
  );

export default function ProfileNFTs({ address }: { address: string }) {
  const chainId = useChainId();

  const isSupportedChain = useMemo(
    () => true || Boolean(SUPPORTED_CHAINS[chainId]),
    [chainId],
  );

  return (
    <Tab.Group as="div" className="w-full">
      <Tab.List as="div" className="my-4 flex justify-center gap-4">
        <Tab className={makeTabClasses}>Created</Tab>
        <Tab className={makeTabClasses}>Brought</Tab>
        {isSupportedChain && <Tab className={makeTabClasses}>Owned</Tab>}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <CreatedNFTs address={address} />
        </Tab.Panel>
        <Tab.Panel>
          <BroughtNFTs address={address} />
        </Tab.Panel>
        {isSupportedChain && (
          <Tab.Panel>
            <OwnedNFTs address={address} />
          </Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
  );
}
