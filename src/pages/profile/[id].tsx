import { useQuery } from '@apollo/client';
import { WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SpinnerCircular } from 'spinners-react';

import Layout from '@/components/layout';
import ProfileNFTs from '@/components/profileNFTs';
import { getProfileById } from '@/graphql/GetProfileById';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
  { ssr: false },
);

const widgetProps: WidgetProps = {
  actionId: 'wid_staging_PCNQeDC5CX',
  signal: 'user-id-1',
  enableTelemetry: true,
  appName: 'ConfCon',
  signalDescription: 'Get your ticket to ConfCon 2023',
  theme: 'dark',
  debug: true, // Recommended **only** for development
  onSuccess: (result) => console.log(result),
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log('Init successful'),
  onInitError: (error) =>
    console.log('Error while initialization World ID', error),
};

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState();
  const { address } = useAccount();

  const { loading, error } = useQuery(getProfileById, {
    variables: { id },
    onCompleted(data) {
      setProfile(data?.profile);
    },
  });

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
                {profile?.picture &&
                profile?.picture.original &&
                profile?.picture.original.url.includes(
                  'lens.infura-ipfs.io',
                ) ? (
                  <div className="relative mx-auto h-60 w-60 rounded bg-emerald-900">
                    <Image
                      src={profile?.picture?.original.url}
                      layout="fill"
                      objectFit="cover"
                      alt={profile.handle}
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="mx-auto h-60 w-60 rounded bg-emerald-900" />
                )}
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
                  <WorldIDWidget {...widgetProps} />
                  <p className="mb-4">{profile.bio}</p>
                  {/* Add connect and follow buttons here */}
                </div>
                {/* Add publications here */}
              </div>
            </div>
            <ProfileNFTs address={id as string} />
          </>
        ) : (
          <>
            <div className="flex w-full flex-wrap items-start md:flex-nowrap">
              <div className="mb-4 w-full md:mr-8 md:w-auto">
                <div className="relative mx-auto h-60 w-60 rounded bg-emerald-900"></div>
              </div>
              <div className="w-full">
                <div className="text-center md:text-left">
                  <h2 className="mb-2 text-xl font-bold text-black sm:text-2xl sm:tracking-tight">
                    {address}
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
                  <WorldIDWidget {...widgetProps} />
                  {/* Add connect and follow buttons here */}
                </div>
                {/* Add publications here */}
              </div>
            </div>
            <ProfileNFTs address={id as string} />
          </>
        )}
      </div>
    </Layout>
  );
}
