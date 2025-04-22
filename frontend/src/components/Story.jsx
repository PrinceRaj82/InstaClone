import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const dummyStories = [
  {
    id: 1,
    username: "yourstory",
    profile: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    username: "john",
    profile: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 1,
    username: "yourstory",
    profile: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    username: "john",
    profile: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 1,
    username: "yourstory",
    profile: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    username: "john",
    profile: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 3,
    username: "emma",
    profile: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    profile: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "olivia",
    profile: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    profile: "https://i.pravatar.cc/150?img=6",
  },
];

const Stories = () => {
  return (
    <div className="fixed top-0 z-20 max-w-[1300px] border-b border-gray-800 px-4 py-2 overflow-x-auto scrollbar-hide bg-black over">
      <div className="flex gap-4">
        {dummyStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center text-white w-[60px]"
          >
            <Avatar className="h-14 w-14 border-2 border-pink-500">
              <AvatarImage src={story.profile} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-xs truncate mt-1">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
