import posts from './mockData';
import Post from './post';

const Feed = () => {
  return (
    <section className="space-y-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Feed;
