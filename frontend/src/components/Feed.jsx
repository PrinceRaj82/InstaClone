
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-4 md:my-8 flex flex-col items-center justify-center px-2 bg-black text-white overflow-hidden'>
      <div className='w-full max-w-3x border border-red-600'>
        <Posts/>
      </div>
    </div>
  )
}

export default Feed