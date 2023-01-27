import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import Post from '@/components/Post';

export default function Home() {
  const [currentId, setCurrentId] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <Input currentId={currentId} setCurrentId={setCurrentId} />
      <Post setCurrentId={setCurrentId} />
    </>
  );
}
