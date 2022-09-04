import React from 'react'

interface resultProps {
    children: React.ReactNode,
    setIsLoading: any
}

export default function Result({children, setIsLoading}: resultProps) {
const closeResult = () => {
    setIsLoading('isError', false)
    setIsLoading('isSuccess', false)
}

  return (
    <div className='px-20 absolute top-0 bottom-0 right-0 left-0 z-10 bg-white/50 flex justify-center items-center'>
        <div className='relative max-w-6xl w-full max-h-[600px] h-full bg-primary flex flex-col justify-center items-center'>
        <button onClick={() => closeResult()} className="text-white font-ligjt text-2xl absolute right-9 top-9 ">X</button>
            {children}
        </div>
    </div>
  )
}
