import React from 'react'

const ConnectBG = () => {
  return (
    <div className='relative w-full h-full'>
      <div className='w-full relative bg-[#E4D6FF] rounded-md md:min-w-40 min-w-10 max-w-30 md:max-w-50 min-h-30 md:min-h-40 border-1 border-purple-300 '>
        <img
          src='pngwing.com (80) 1.png'
          alt='...'
          className='absolute bottom-0 left-0 w-30 md:w-100'
        />
        <div className='bg-purple-400/75 font-medium text-white p-3 rounded-xl text-center absolute -bottom-5 -right-15 border-1 border-purple-500'>
          Raj Aryan
        </div>
      </div>

      <div className='absolute top-8 left-47 -z-10 hidden md:inline-block'>
        <img src='Line 162.png' alt='...' width={'95%'} />
      </div>

      <div className='w-full relative bg-[#BAD3FC] rounded-md md:min-w-40 min-w-10 max-w-30 md:max-w-50 min-h-30 md:min-h-40 float-right  border-1 border-blue-300 '>
        <img
          src='pngwing.com (84) 1.png'
          alt='...'
          className='absolute bottom-0 left-0 w-30 md:w-100'
        />
        <div className='bg-blue-400/75 text-white font-medium p-3 rounded-xl text-center absolute -bottom-5 -left-15 border-1 border-blue-500'>
          Sameer Roy
        </div>
      </div>
    </div>
  )
}

export default ConnectBG
