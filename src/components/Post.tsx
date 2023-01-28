import { useState } from 'react';
import { useDeleteOnePostMutation, useUpdateOnePostMutation } from '@/api/post';
import { IPost } from '@/models/post';

export default function Post({ post }: { post: IPost }) {
  const [updatingText, setUpdatingText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatePost] = useUpdateOnePostMutation();
  const [deletePost] = useDeleteOnePostMutation();

  const saveUpdating = (post: IPost) => {
    updatePost({ id: post.id, name: updatingText });
    setIsUpdating(false);
  };

  return (
    <>
      <div
        key={post.id}
        className="mt-5 px-5 py-7 max-w-full bg-slate-100 rounded-md flex h-20 align-center justify-between"
      >
        {!isUpdating ? (
          <h3>{post.name}</h3>
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
                  setUpdatingText(post.name);
                }}
                className="px-4 bg-blue-500 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-4 bg-red-500 rounded-md"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => saveUpdating(post)}
              className="px-4 bg-blue-500 rounded-md"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
}
