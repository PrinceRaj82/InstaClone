import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://instaclone-nn56.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  };

  const sidebarItems = [
    { icon: <Home className="w-6 h-6" />, text: "Home" },
    { icon: <Search className="w-6 h-6" />, text: "Search" },
    { icon: <TrendingUp className="w-6 h-6" />, text: "Explore" },
    { icon: <MessageCircle className="w-6 h-6" />, text: "Messages" },
    { icon: <Heart className="w-6 h-6" />, text: "Notifications" },
    { icon: <PlusSquare className="w-6 h-6" />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut className="w-6 h-6" />, text: "Logout" },
  ];

  return (
<div className="fixed overflow-y-auto bottom-0 left-0 w-full bg-black border-t border-gray-800 
  md:h-screen md:w-auto md:border-t-0 md:border-r md:top-0 md:bottom-0 z-50 ">

      {" "}
      <div className="flex flex-col h-full">
       <img src="https://as2.ftcdn.net/jpg/03/97/48/01/1000_F_397480131_ifXqWNKVteOhczWDJBeODrnMIbVcVp13.jpg" className='w-32 self-center pt-4 hidden lg:block md:block ' alt="" />
        <nav className="flex md:flex-col justify-around md:justify-start px-2 md:px-4 py-2 md:py-0">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-4 relative hover:bg-gray-900 cursor-pointer rounded-lg p-2 md:p-3 my-1 md:my-2 text-white group"
            >
              {item.icon}
              <span className="text-xs md:text-sm">{item.text}</span>
              {/* <span className="text-[10px] md:text-sm hidden xs:inline">{item.text}</span> */}
              {item.text === "Notifications" && likeNotification.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full h-4 w-4 md:h-5 md:w-5 bg-red-600 hover:bg-red-600 absolute -top-1 -right-1 md:bottom-6 md:left-6"
                    >
                      {likeNotification.length}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-black text-white border border-gray-800">
                    <div className="space-y-2">
                      {likeNotification.length === 0 ? (
                        <p>No new notifications</p>
                      ) : (
                        likeNotification.map((notification) => (
                          <div
                            key={notification.userId}
                            className="flex items-center gap-2 my-2"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={notification.userDetails?.profilePicture}
                              />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">
                                {notification.userDetails?.username}
                              </span>{" "}
                              liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </nav>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
