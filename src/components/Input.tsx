import { useState, FormEvent } from 'react';
import { useGetAllPostsQuery, useCreateOnePostMutation } from '@/api/post';

export default function Input() {
  const [input, setInput] = useState<string>('');
  const [createPost] = useCreateOnePostMutation();
  const { data: posts } = useGetAllPostsQuery();

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    createPost({ id: posts![posts!.length - 1].id + 1, name: input });
    setInput('');
  };

  return (
    <form onSubmit={submitData} className="flex">
      <input
        placeholder="Type something..."
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 outline-none rounded-md border border-collapse border-black p-2 max-w-full"
      />
      <button className="px-7 py-3 bg-green-500 rounded-md" type="submit">
        Submit
      </button>
    </form>
  );
}
