import { useQuery } from '@apollo/client';
import { SpinnerCircular } from 'spinners-react';

import { recommendedProfiles } from '@/graphql/RecommendedProfiles';
import useIsLensSupported from '@/hooks/useIsLensSupported';
import IProfile from '@/schemas/profile';

import Person from './person';

const Panel = () => {
  const isLensSupported = useIsLensSupported();
  const { loading, error, data } = useQuery(recommendedProfiles, {
    skip: !isLensSupported,
  });

  if (!isLensSupported) return null;

  if (loading) return <SpinnerCircular />;
  if (error) return <>Error! {error.message}</>;

  return (
    <>
      <div className="relative hidden w-[22rem] px-4 pt-4 lg:block">
        <section className="sticky top-[7rem] space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold opacity-50">
              Suggestted Uers For You
            </h1>
            <button>See All</button>
          </div>

          <div className="space-y-4">
            {data.recommendedProfiles.map((profile: IProfile) => (
              <Person key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Panel;
