import Image from 'next/image';
import Link from 'next/link';

import IProfile from '@/schemas/profile';

import FollowButton from './followButton';

interface IProps {
  profile: IProfile;
}

const Profile = ({ profile }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${profile.id}`} key={profile.id}>
          <div className="h-8 w-8 overflow-hidden rounded-full">
            {profile.picture &&
            profile.picture.original &&
            profile.picture.original.url.includes('lens.infura-ipfs.io') ? (
              <div className="relative h-60 w-60 rounded bg-emerald-900">
                <Image
                  src={profile.picture.original.url}
                  layout="fill"
                  objectFit="cover"
                  alt={profile.handle}
                  className="rounded"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <div className="h-60 w-60 rounded bg-emerald-900" />
            )}
          </div>
        </Link>

        <div className="text-xs">
          <h3 className="text-sm font-semibold">{profile.handle}</h3>
          {profile.bio && <h4 className="opacity-50">{profile.bio}</h4>}
        </div>
      </div>

      <FollowButton profile={profile} />
    </div>
  );
};

export default Profile;
