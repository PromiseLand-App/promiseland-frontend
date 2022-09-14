import IPost from "@/schemas/post";
import {
  BookmarkIcon,
  EmojiCollection,
  MessageIcon,
  ShareIcon,
} from "@/assets/icons";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  return (
    <div className="relative border-[1px] border-gray-300 rounded-lg bg-white px-5 p-4 max-w-[30rem] mx-auto space-y-4">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center -m-2">
          <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
            <img className="w-full" src={post.profile} alt={post.profile} />
          </div>
          <h2 className="font-semibold">{post.username}</h2>
          <h2 className="font-semibold text-xs text-slate-500">
            {post.action} a NFT
          </h2>
        </div>
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 aspect-square overflow-hidden">
        <img className="w-full" src={post.image} alt={post.username} />
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">{post.username}: </span>
          {post.description}
        </p>
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-4">
            <ThumbUpOffAltIcon />
            <ThumbDownOffAltIcon />
            <MessageIcon />
            <ShareIcon />
          </div>
          <BookmarkIcon />
        </div>
        <span className=" font-semibold">{`${post.likes} likes`}</span>
        <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
      </div>

      <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

      <div className="flex gap-4">
        <EmojiCollection />
        <input
          className="focus:outline-none w-full"
          type="text"
          placeholder="Add a comment"
        />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default Post;
