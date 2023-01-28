import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import Post from '@/components/Post';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <Navbar />
      <Input />
      <Post />
    </div>
  );
}
