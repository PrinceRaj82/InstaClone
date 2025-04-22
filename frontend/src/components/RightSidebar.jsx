import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth)

  return (
    <div className="relative z-50 hidden lg:block scrollbar-hide w-full p-8 border border-gray-800 max-w-[100vw] overflow-x-auto bg-black md:h-screen md:w-64 md:max-w-[16rem] border-t md:border-r border-gray-800 md:border-t-0">
     <div className="flex items-center gap-3 mb-6">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link to={`/profile/${user?._id}`} className="font-semibold text-sm hover:underline">
            {user?.username}
          </Link>
          <p className="text-gray-400 text-sm">{user?.bio || 'Bio here...'}</p>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  )
}

export default RightSidebar
