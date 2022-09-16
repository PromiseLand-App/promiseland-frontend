import IProfile from '../../schemas/profile';
import Button from './button';

interface IProps {
  profile: IProfile;
}

const Profile = ({ profile }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img className="w-full" src={profile} alt={profile.username} />
        </div>

        <div className="text-xs">
          <h3 className="text-sm font-semibold">{profile.handle}</h3>
          {/* <h4 className="opacity-50">Followed by {profile.followedBy}</h4> */}
        </div>
      </div>

      <Button>Follow</Button>
    </div>
  );
};

export default Profile;
