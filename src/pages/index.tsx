import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import Posts from '@/components/Posts';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <Navbar />
      <Input />
      <Posts />
    </div>
  );
}
