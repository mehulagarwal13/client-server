const PeopleCard = () => {
  return (
    <div className="w-full min-h-100 flex items-center sm:justify-center ml-3 mt-14">
      <div className='w-70 min-h-[100%] md:w-90 sm:w-80 rounded-lg border border-gray-400 relative bg-gradient-to-b from-[#7940E9] to-purple-500 pt-20 overflow-visible'>
        <div className='absolute left-1/2 -translate-x-1/2 -top-20'>
          <img
            src='./People1.png'
            alt='person'
            className='size-40 rounded-full object-cover'
          />
        </div>

        <div className='w-full h-full p-3'>
            <p className='text-white text-lg font-medium text-center'>
              Ankit Sharma
            </p>
            <p className='text-sm text-white text-center'>
              Bengaluru, Karnataka
            </p>
            <p className='text-white text-sm text-center mt-2 leading-7 line-clamp-5'>
              Lorem ipsum dolor sit amet consectetur. Iaculis tempus diam vel viverra leo congue. Quis massa eget nisl faucibus orci. Sodales varius lacus consequat tempus in tellus vitae. Feugiat interdum ullamcorper tincidunt ornare in aliquam massa more...
            </p>
        </div>
      </div>
    </div>
  )
}

export default PeopleCard
