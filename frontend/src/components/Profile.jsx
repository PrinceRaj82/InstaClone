import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AtSign, Heart, MessageCircle } from 'lucide-react'

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="flex flex-col gap-8 md:gap-16 py-8">
        {/* Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="flex justify-center md:justify-end">
            <Avatar className="h-24 w-24 md:h-36 md:w-36">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info Section */}
          <div className="col-span-2 space-y-6">
            {/* Username and Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <span className="text-xl">{userProfile?.username}</span>
              <div className="flex flex-wrap gap-2">
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant="secondary" size="sm">Edit profile</Button>
                    </Link>
                    <Button variant="secondary" size="sm">View archive</Button>
                    <Button variant="secondary" size="sm">Ad tools</Button>
                  </>
                ) : (
                  isFollowing ? (
                    <>
                      <Button variant="secondary" size="sm">Unfollow</Button>
                      <Button variant="secondary" size="sm">Message</Button>
                    </>
                  ) : (
                    <Button size="sm" className="bg-[#0095F6] hover:bg-[#3192d2]">Follow</Button>
                  )
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
              <p><span className="font-semibold">{userProfile?.posts.length}</span> posts</p>
              <p><span className="font-semibold">{userProfile?.followers.length}</span> followers</p>
              <p><span className="font-semibold">{userProfile?.following.length}</span> following</p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <span className="font-semibold block">{userProfile?.bio || 'bio here...'}</span>
              <Badge className="w-fit" variant="secondary">
                <AtSign /> <span className="pl-1">{userProfile?.username}</span>
              </Badge>
              <div className="space-y-1 text-sm">
                <p>🤯Learn code with patel mernstack style</p>
                <p>🤯Turing code into fun</p>
                <p>🤯DM for collaboration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Posts Grid */}
        <div className="border-t border-gray-200 pt-4">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 text-sm mb-8 overflow-x-auto">
            <button 
              className={`py-3 uppercase ${activeTab === 'posts' ? 'font-bold border-t-2 border-black' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              Posts
            </button>
            <button 
              className={`py-3 uppercase ${activeTab === 'saved' ? 'font-bold border-t-2 border-black' : ''}`}
              onClick={() => handleTabChange('saved')}
            >
              Saved
            </button>
            <button className="py-3 uppercase">Reels</button>
            <button className="py-3 uppercase">Tags</button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
            {displayedPost?.map((post) => (
              <div key={post?._id} className="relative aspect-square group">
                <img 
                  src={post.image} 
                  alt="post" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white gap-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6" />
                      <span>{post?.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      <span>{post?.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile