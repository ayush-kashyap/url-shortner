import React from 'react'

export default function Loader() {
  return (
    <div className='flex flex-col items-center justify-center bg-white bg-opacity-90 h-screen w-screen absolute top-0 left-0'>
        <div className='loader'></div>
        <span className='my-2 font-bold text-xl'>Cutting Extra Length</span>
    </div>
  )
}
