interface IProfile {
  id: string;
  image: string;
  username: string;
  followedBy: string;
  handle: string;
  bio: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  picture: any;
}

export default IProfile;
