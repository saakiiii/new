export default function Message({title, content, link}) {
    return (
          <div className='flex text-center h-[100vh] w-[100%] justify-center items-center'>
              <h1 className=' text-2xl pr-2 border-r-2 border-black'>{title}</h1>
              <p className=' ml-2'>{content}</p>
          </div>
      )
  }