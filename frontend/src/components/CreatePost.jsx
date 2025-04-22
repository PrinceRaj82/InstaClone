import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2, Camera } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const resetFields = () => {
    setFile("");
    setCaption("");
    setImagePreview("");
    setLoading(false);
  };

  useEffect(() => {
    if (!open) resetFields();
  }, [open]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setFile(file);
    const dataUrl = await readFileAsDataURL(file);
    setImagePreview(dataUrl);
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://instaclone-nn56.onrender.com/api/v1/post/addpost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false); // Close and reset via useEffect
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="rounded-xl p-6 bg-white shadow-xl relative max-w-lg w-full 
               top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
      >
        {/* Header */}
        <DialogHeader className="text-center font-semibold text-lg text-gray-800">
          Create New Post
        </DialogHeader>

        {/* Back Button */}
        <Button
          onClick={() => setOpen(false)}
          className="absolute top-4 left-4 bg-transparent text-3xl hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-full p-2"
        >
          &#8592;
        </Button>

        {/* User Info */}
        <div className="flex gap-4 items-center mt-4">
          <Avatar className="w-12 h-12 border-2 border-gray-300 rounded-full shadow-md">
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm text-gray-800">
              {user?.username}
            </h1>
            <span className="text-gray-500 text-xs">Bio here...</span>
          </div>
        </div>

        {/* Caption */}
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a caption..."
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4 w-full h-64 flex items-center justify-center rounded-xl overflow-hidden shadow-md">
            <img
              src={imagePreview}
              alt="preview_img"
              className="object-cover h-full w-full"
            />
          </div>
        )}

        {/* Upload Button + Input (always visible) */}
        <div className="mt-4 text-center">
          <Button
            onClick={() => imageRef.current.click()}
            className="w-full bg-[#0095F6] hover:bg-[#258bcf] text-white py-2 rounded-md"
          >
            <Camera className="mr-2 h-4 w-4" />
            {imagePreview ? "Change Photo" : "Select from Computer"}
          </Button>
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={fileChangeHandler}
          />
        </div>

        {/* Post Button */}
        {imagePreview &&
          (loading ? (
            <Button className="w-full mt-4 bg-gray-300 text-gray-600" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full mt-4 bg-[#0095F6] hover:bg-[#258bcf] text-white py-2 rounded-md"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
