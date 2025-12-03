import React from 'react'

const Footer = () => {
  return (
    <div className='w-full min-h-[50vh] bg-[#1E1E1E] flex justify-around p-5'>
      <div className='w-4/5 h-full md:flex justify-between items-center gap-10'>
        <div className='w-full h-full'>
          <header className='border-b-2 border-b-white text-white font-medium text-lg'>
            About
          </header>
        </div>
        <div className='w-full h-full'>
          <header className='border-b-2 border-b-white text-white font-medium text-lg'>
            Contact
          </header>
        </div>
        <div className='w-full h-full'>
          <header className='border-b-2 border-b-white text-white font-medium text-lg'>
            Terms
          </header>
        </div>
        <div className='w-full h-full'>
          <header className='border-b-2 border-b-white text-white font-medium text-lg'>
            Policy
          </header>
        </div>
      </div>
    </div>
  )
}

export default Footer
