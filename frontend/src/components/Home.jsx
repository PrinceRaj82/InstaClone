
import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
import Stories from './Story'
const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
  
    return (
        <div className="flex h-screen">
        {/* Feed Area (scrollable) */}
        <div className="w-full overflow-y-auto h-screen md:pb-0 scrollbar-hidden  ">
          
          {/* 🔥 Place Stories Component Here */}
          <Stories />
  
          {/* Posts Feed */}
          <Feed />
          <Outlet />
        </div>
  
        {/* Right Sidebar */}
        <div className="hidden md:block">
          <RightSidebar />
        </div>
      </div>
    );
  };


export default Home
