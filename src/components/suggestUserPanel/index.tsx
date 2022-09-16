import { useQuery } from '@apollo/client';

import { recommendedProfiles } from '@/graphql/RecommendedProfiles';
import IProfile from '@/schemas/profile';

import Button from './button';
import Person from './person';

const Panel = () => {
  const { loading, error, data } = useQuery(recommendedProfiles);

  if (loading) return 'Loading..';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="relative hidden w-[22rem] px-4 pt-4 lg:block">
      <section className="sticky top-[7rem] space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold opacity-50">Suggestted Uers For You</h1>
          <Button blacked>See All</Button>
        </div>

        <div className="space-y-4">
          {data.recommendedProfiles.map((profile: IProfile) => (
            <Person key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Panel;
