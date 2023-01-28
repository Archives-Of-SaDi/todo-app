import { useGetAllPostsQuery } from '@/api/post';
import { IPost } from '@/models/post';
import Post from './Post';

export default function Posts() {
  const { data: posts, isFetching, isError } = useGetAllPostsQuery();

  if (isFetching) return <div>Fetching</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      {posts?.length ? (
        posts.map((post: IPost) => <Post post={post} key={post.id} />)
      ) : (
        <p>There is no post...</p>
      )}
    </>
  );
}
