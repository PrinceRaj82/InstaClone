import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const { posts } = useSelector(store => store.post);
  return (
    <div className="flex flex-col gap-4 items-end scrollbar-hide W-[100%]">
      {posts.map((post) => (
        <div key={post._id} className="w-[100%] mx-auto border border-r-emerald-300">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};


export default Posts