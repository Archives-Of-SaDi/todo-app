import {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  useGetAllPostsQuery,
  useCreateOnePostMutation,
  useUpdateOnePostMutation,
  useGetOnePostQuery,
} from "@/api/post";
import { IPost } from "@/models/post";

type PostProps = {
  currentId: number | null;
  setCurrentId: Dispatch<SetStateAction<number | null>>;
};

export default function Input({ currentId, setCurrentId }: PostProps) {
  const [input, setInput] = useState<string>("");
  const [createPost] = useCreateOnePostMutation();
  const { data: posts } = useGetAllPostsQuery();
  const [updatePost] = useUpdateOnePostMutation();

  const currentPost: IPost | null | undefined = useGetOnePostQuery(
    currentId!
  ).data;

  useEffect(() => {
    if (!currentPost) return;
    setInput(currentPost.name);
  }, [currentPost]);

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    if (currentId && currentPost) {
      updatePost({ id: currentId, post: currentPost });
    } else {
      createPost({ id: posts![posts!.length - 1].id + 1, name: input });
    }
    setInput("");
  };

  return (
    <form onSubmit={submitData} className="flex">
      <input
        placeholder="Type something..."
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 outline-none rounded-md border border-collapse border-black p-2 max-w-full"
      />
      <button className="px-7 py-3 bg-green-500 rounded-md" type="submit">
        Submit
      </button>
    </form>
  );
}
