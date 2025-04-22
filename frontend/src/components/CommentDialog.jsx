import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {

    try {
      const res = await axios.post(`https://instaclone-nn56.onrender.com/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-[95vw] md:max-w-5xl p-0 flex flex-col h-[90vh] md:h-auto">
        <div className='flex flex-col md:flex-row flex-1'>
          <div className='w-full md:w-1/2 max-h-[40vh] md:max-h-none'>
            <img
              src={selectedPost?.image}
              alt="post_img"
              className='w-full h-full object-cover md:rounded-l-lg'
            />
          </div>
          <div className='w-full md:w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-3 md:p-4'>
              <div className='flex gap-2 md:gap-3 items-center'>
                <Link>
                  <Avatar className='h-8 w-8 md:h-10 md:w-10'>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs md:text-sm'>{selectedPost?.author?.username}</Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer h-5 w-5 md:h-6 md:w-6' />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold py-2'>
                    Unfollow
                  </div>
                  <div className='cursor-pointer w-full py-2'>
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-[30vh] md:max-h-96 p-3 md:p-4'>
              {comment.map((comment) => <Comment key={comment._id} comment={comment} />)}
            </div>
            <div className='p-3 md:p-4'>
              <div className='flex items-center gap-2'>
                <input 
                  type="text" 
                  value={text} 
                  onChange={changeEventHandler} 
                  placeholder='Add a comment...' 
                  className='w-full outline-none border text-xs md:text-sm border-gray-300 p-2 rounded' 
                />
                <Button 
                  disabled={!text.trim()} 
                  onClick={sendMessageHandler} 
                  variant="outline"
                  className="text-xs md:text-sm px-2 md:px-4"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog