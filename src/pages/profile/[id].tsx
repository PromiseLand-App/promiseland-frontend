import { useQuery } from '@apollo/client';
import { WidgetProps } from '@worldcoin/id';
import { getAddress, isAddress } from 'ethers/lib/utils';
import dynamic from 'next/dynamic';
import { SpinnerCircular } from 'spinners-react';

import Image from '@/components/Image';
import Layout from '@/components/layout';
import ProfileNFTs from '@/components/profileNFTs';
import { getDefaultProfile } from '@/graphql/GetDefaultProfile';
import { getProfileById } from '@/graphql/GetProfileById';
import { getProfilesByAddress } from '@/graphql/GetProfilesByAddress';
import useIsLensSupported from '@/hooks/useIsLensSupported';
import { queryParamStringParser, useQueryParam } from '@/hooks/useQueryParam';

export default function Profile() {
  const id = useQueryParam('id', queryParamStringParser);
  const isLensSupported = useIsLensSupported();

  const isWallet = isAddress(id ?? '');

  const { data, loading, error } = useQuery(
    isWallet ? getDefaultProfile : getProfileById,
    {
      variables: isWallet ? { address: id } : { id },
      skip: !id || !isLensSupported,
    },
  );

  const { data: profilesResult } = useQuery(getProfilesByAddress, {
    variables: { address: id },
    skip: !isWallet || !isLensSupported || data?.profile,
  });

  const profile = data?.profile ?? profilesResult?.profiles?.items?.[0];

  if (loading)
    return (
      <Layout>
        <SpinnerCircular />
      </Layout>
    );

  if (error) return <>Error! {error.message}</>;

  return (
    <Layout>
      <div className="my-12 flex flex-col gap-8 divide-y">
        {profile ? (
          <>
            <div className="flex w-full flex-wrap items-start md:flex-nowrap">
              <div className="mb-4 w-full md:mr-8 md:w-auto">
                <div className="mx-auto h-60 w-60 rounded bg-blue-800">
                  {profile?.picture?.original?.url && (
                    <Image
                      src={profile?.picture?.original.url}
                      alt={profile.handle}
                      className="h-full w-full rounded object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="text-center md:text-left">
                  <h1 className="mb-1 text-3xl font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
                    {profile?.name}
                  </h1>

                  <h2 className="mb-2 text-xl font-bold text-emerald-500 sm:text-2xl sm:tracking-tight">
                    {profile?.handle}
                  </h2>
                  <h2 className="mb-2 text-xl font-bold text-black sm:text-2xl sm:tracking-tight">
                    {profile?.ownedBy}
                  </h2>
                  <div className="mb-4 flex flex-wrap justify-center gap-x-2 text-sm text-gray-600 sm:text-base md:justify-start">
                    <p>
                      <span className="font-medium text-gray-900">
                        {profile?.stats?.totalFollowers}
                      </span>{' '}
                      Followers
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        {profile?.stats?.totalFollowing}
                      </span>{' '}
                      Following
                    </p>
                  </div>

                  <p className="mb-4">{profile.bio}</p>
                  {/* Add connect and follow buttons here */}
                </div>
                {/* Add publications here */}
              </div>
            </div>
            <ProfileNFTs address={profile.ownedBy as string} />
          </>
        ) : isWallet ? (
          <>
            <div className="flex w-full flex-wrap items-start md:flex-nowrap">
              <div className="mb-4 w-full md:mr-8 md:w-auto">
                <div className="relative mx-auto h-60 w-60 rounded bg-emerald-900"></div>
              </div>
              <div className="w-full">
                <div className="text-center md:text-left">
                  <h2 className="mb-2 text-xl font-bold text-black sm:text-2xl sm:tracking-tight">
                    {getAddress(id as string)}
                  </h2>
                  <div className="mb-4 flex flex-wrap justify-center gap-x-2 text-sm text-gray-600 sm:text-base md:justify-start">
                    <p>
                      <span className="font-medium text-gray-900">0</span>{' '}
                      Followers
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">0</span>{' '}
                      Following
                    </p>
                  </div>

                  {/* Add connect and follow buttons here */}
                </div>
                {/* Add publications here */}
              </div>
            </div>
            <ProfileNFTs address={id as string} />
          </>
        ) : (
          <div>Invalid address</div>
        )}
      </div>
    </Layout>
  );
}
