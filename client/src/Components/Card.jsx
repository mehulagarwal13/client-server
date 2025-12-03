import { ArrowRightFromLine } from 'lucide-react'

const Card = ({ heading, image, text }) => {
  return (
    <div className='h-full w-4/5 md:w-full rounded-md bg-white shadow-lg border-1 border-gray-300 relative group'>
      <p className='text-3xl font-semibold text-center mt-2'>{heading}</p>
      <p className='w-full flex justify-center mt-2'>
        <img
          src={'./' + image}
          alt='...'
          className='size-30 object-contain mb-4'
        />
      </p>
      <p className='px-5 text-center my-2 font-semibold text-lg'>{text}</p>

      <div className='w-full h-0 bg-purple-700 bottom-0 left-0 absolute rounded-md group-hover:h-full transition-all overflow-hidden'>
        <div className='w-full h-full p-2'>
          <p className='text-white text-xl font-semibold'>{heading}</p>
          <p className='text-white mt-2'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            recusandae aliquid dolores eius sed minima aspernatur. Dolore animi,
            ut deleniti aspernatur earum totam magnam facere, sequi quia dolor,
            quaerat et.
          </p>
          <button className='text-white text-xl mt-3'>
            Learn More <ArrowRightFromLine className='inline-block' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
