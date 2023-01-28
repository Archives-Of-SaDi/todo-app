import { useState } from 'react';
import {
  useGetAllPostsQuery,
  useDeleteOnePostMutation,
  useUpdateOnePostMutation,
} from '@/api/post';
import { IPost } from '@/models/post';

export default function Post() {
  const [updatingText, setUpdatingText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: posts, isFetching, isError } = useGetAllPostsQuery();
  const [updatePost] = useUpdateOnePostMutation();
  const [deletePost] = useDeleteOnePostMutation();

  if (isFetching) return <div>Fetching</div>;
  if (isError) return <div>Error</div>;

  const saveUpdating = (post: IPost) => {
    updatePost({ id: post.id, name: updatingText });
    setIsUpdating(false);
  };

  return (
    <>
      {posts?.length ? (
        posts.map((p: IPost) => (
          <div
            key={p.id}
            className="mt-5 px-5 py-7 max-w-full bg-slate-100 rounded-md flex h-20 align-center justify-between"
          >
            {!isUpdating ? (
              <h3>{p.name}</h3>
            ) : (
              <input
                className="bg-transparent outline-none"
                autoFocus={isUpdating}
                value={updatingText}
                onChange={e => setUpdatingText(e.target.value)}
                type={'text'}
              />
            )}
            <div className="flex flex-row">
              {!isUpdating ? (
                <>
                  <button
                    onClick={() => {
                      setIsUpdating(true);
                      setUpdatingText(p.name);
                    }}
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
                </>
              ) : (
                <button
                  onClick={() => saveUpdating(p)}
                  className="px-4 bg-blue-500 rounded-md"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>There is no post</h1>
      )}
    </>
  );
}
