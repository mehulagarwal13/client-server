import React from 'react'

const Review = () => {
  const images = [
    '/Ellipse 7.png',
    '/Ellipse 8.png',
    '/Ellipse 9.png',
    '/Ellipse 10.png',
    '/Ellipse 11.png',
    '/Ellipse 12.png',
    '/Frame1000005153.png'
  ]
  return (
    <div className='w-full md:flex justify-start items-center mt-10 md:mt-0'>
      <div className='w-full md:w-1/3 relative flex items-center'>
        {images.map((image, index) => (
          <img
            src={image}
            alt='...'
            key={index}
            width={30}
            className={`rounded-full absolute z-20 `}
            style={{left: `${index * 20}px`}}
          />
        ))}
      </div>
      <div className='md:mt-0 mt-5'>
        <p>Student Review</p>
        <p>Based on more than 10,000 feedback</p>
      </div>
    </div>
  )
}

export default Review
