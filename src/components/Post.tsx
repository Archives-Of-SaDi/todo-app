import { Dispatch, SetStateAction } from 'react';
import { useGetAllPostsQuery, useDeleteOnePostMutation } from '@/api/post';
import { IPost } from '@/models/post';

type PostProps = {
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

export default function Post({ setCurrentId }: PostProps) {
  const { data: posts, isFetching, isError } = useGetAllPostsQuery();
  const [deletePost] = useDeleteOnePostMutation();

  if (isFetching) return <div>Fetching</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      {posts?.length ? (
        posts.map((p: IPost) => (
          <div
            key={p.id}
            className="mt-5 px-5 py-7 max-w-full bg-slate-100 rounded-md flex h-20 align-center justify-between"
          >
            <h3>{p.name}</h3>
            <div className="flex flex-row">
              <button
                onClick={() => setCurrentId(p.id)}
                className="px-4 bg-blue-500 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => deletePost(p.id)}
                className="px-4 bg-red-500 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>There is no post</h1>
      )}
    </>
  );
}
