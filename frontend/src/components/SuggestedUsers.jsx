import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers, user } = useSelector(store => store.auth);

    return (
        <div className="w-full max-w-md mx-auto text-white bg-black">
            <div className="flex items-center justify-between mt-6 mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-semibold text-sm">{user?.username}</h1>
                        <p className="text-gray-400 text-xs">POWRED BY AI</p>
                    </div>
                </div>
                <button className="text-blue-400 font-medium text-sm hover:text-blue-500">Switch</button>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
                <h1 className="font-semibold text-gray-400">Suggested for you</h1>
                <span className="text-xs text-white cursor-pointer hover:underline">See All</span>
            </div>

            <div className="space-y-4">
                {suggestedUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to={`/profile/${user?._id}`}>
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={user?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="text-sm">
                                <Link to={`/profile/${user?._id}`} className="font-semibold hover:underline block">
                                    {user?.username}
                                </Link>
                                <span className="text-gray-500 text-xs">
                                    {user?.bio || 'Suggested for you'}
                                </span>
                            </div>
                        </div>
                        <button className="text-blue-400 text-xs font-bold hover:text-blue-500">Follow</button>
                    </div>
                ))}
            </div>

            <div className="text-xs text-gray-500 mt-6 space-y-2">
                <p>About · Help · Press · API · Jobs · Privacy · Terms ·</p>
                <p>Locations · Language · Meta Verified</p>
                <p className="pt-2">© 2025 INSTAGRAM FROM META</p>
            </div>
        </div>
    );
};

export default SuggestedUsers;
