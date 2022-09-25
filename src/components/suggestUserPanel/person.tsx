import Link from 'next/link';

import IProfile from '@/schemas/profile';

import Image from '../Image';
import FollowButton from './followButton';

interface IProps {
  profile: IProfile;
}

const Profile = ({ profile }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${profile.id}`}>
          <a>
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-emerald-900">
              {profile?.picture?.original?.url && (
                <Image
                  src={profile.picture.original.url}
                  alt={profile.handle}
                  className="h-full w-full rounded object-cover"
                />
              )}
            </div>
          </a>
        </Link>

        <Link href={`/profile/${profile.id}`}>
          <a>
            <div className="text-xs">
              <h3 className="text-sm font-semibold">{profile.handle}</h3>
              {profile.bio && <h4 className="opacity-50">{profile.bio}</h4>}
            </div>
          </a>
        </Link>
      </div>

      <FollowButton profile={profile} />
    </div>
  );
};

export default Profile;
