import { useState } from 'react'

const Accordion = ({ title, content ,index= 0 }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='p-1 rounded-2xl bg-[#E4D6FF] shadow-md shadow-black'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center p-4 text-left font-semibold text-base md:text-3xl cursor-pointer'
      >
        <span className=''>{index} . {title}</span>
        <span
          className='transition-transform duration-300'
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <img src="./Vector2.png" alt="..." className='w-10 bg-[#7940E9] px-3 py-4 rounded-full'/>
        </span>
      </button>

      {open && <div className='p-4 text-gray-800 font-medium'>{content}</div>}
    </div>
  )
}

export default Accordion
