import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import {
  BookmarkIcon,
  EmojiCollection,
  MessageIcon,
  ShareIcon,
} from '@/assets/icons';
import IPost from '@/schemas/post';
import { trimAddress } from '@/utils/helper';

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  return (
    <div className="relative mx-auto max-w-[30rem] space-y-4 rounded-lg border-[1px] border-gray-300 bg-white p-4 px-5">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="-m-2 flex items-center gap-3">
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full">
            <img className="w-full" src={post.image} alt={post.profile} />
          </div>
          <h2 className="font-semibold">{trimAddress(post.seller)}</h2>
          <h2 className="text-xs font-semibold text-slate-500">just create</h2>
        </div>
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 overflow-hidden">
        <img className="w-full" src={post.image} alt={post.username} />
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">{post.seller}: </span>
          {post.description}
        </p>
        <div className="mb-2 flex justify-between">
          <div className="flex items-center gap-4">
            <ThumbUpOffAltIcon />
            <MessageIcon />
            <ShareIcon />
          </div>
          <BookmarkIcon />
        </div>
        <span className=" font-semibold">{`${post.likes} likes`}</span>
        <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
      </div>

      <div className="relative inset-x-0 -mx-5 h-[1px] bg-gray-200"></div>

      <div className="flex gap-4">
        <EmojiCollection />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Add a comment"
        />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default Post;
