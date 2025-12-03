import Review from '../Components/Review'
import Card from '../Components/Card'
import PersonBG from '../Components/PersonBG'
import Accordion from '../Components/Accordian'
import PeoplesSlider from '../Components/PeoplesSlider'

const LandingPage = () => {
  const faqs = [
    {
      q: 'Is TechLearn Hub free?',
      a: 'Basic community features are free. Premium mentorship and bootcamps are paid.'
    },
    {
      q: 'How do I become a mentor?',
      a: 'Apply through the mentor form and pass a short verification process.'
    },
    {
      q: 'Can I host paid workshops?',
      a: 'Yes — mentors can create paid workshops and collect fees via integrated payments.'
    }
  ]
  return (
    <div className='w-full min-h-screen relative overflow-hidden'>
      <div className="w-full min-h-screen flex justify-center items-center md:bg-contain bg-cover bg-[url('/Rectangle110891.png')] relative md:bg-repeat-x">
        <img
          src='./Ellipse 2926.png'
          alt='...'
          className='absolute top-10 md:top-0 right-0 w-1/2 md:w-2/5 opacity-20 md:opacity-100'
        />
        <div className='w-[86%] mt-20 md:mt-46 sm:mt-0 relative'>
          <img
            src='./hat.png'
            className='absolute -top-13 -right-5 md:left-[52%] w-6 md:w-13 sm:w-16'
          />
          <div className='size-28 rounded-xl absolute border-1 border-gray-300 rotate-45 backdrop-blur-sm left-[56%] top-10 md:inline-block hidden'>
            <div className='-rotate-45 w-full h-full flex flex-col justify-center items-center'>
              <img src='./Vector3.png' className='w-6' />
              <p className='text-sm font-medium text-center -rotate-6'>Total Students 1000+</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 fontHead font-bold md:leading-18'>
            Connecting <span className='text-[#7940E9]'>Students</span> and
            <span className='text-[#7940E9]'> Mentors</span> for real time
            collaborative Learning
            <span>
              <img src='./pen.png' alt='...' className='inline w-8 sm:w-15 mx-2' />
            </span>
          </div>
          <p className='md:w-1/2 mt-5 leading-7'>
            “Join a vibrant network where students, mentors, and admins connect
            in real-time groups and private chats. Collaborate, exchange
            knowledge, and build meaningful connections that inspire growth.”
          </p>

          <button className='mt-5 p-2 rounded-md bg-[#7940E9] text-white md:w-1/7 font-medium'>
            Get Started
          </button>

          <div className='mt-5 md:w-1/2'>
            <Review />
          </div>
        </div>
      </div>

      <div className='w-full min-h-screen my-10 flex justify-center'>
        <div className='w-[86%] my-10 mx-auto relative'>
          <img
            src='Line 162.png'
            alt='...'
            className='absolute w-3/5 left-1/5 top-22 md:inline-block hidden'
          />
          <div className='w-full flex md:flex-row flex-col items-center md:items-start justify-between'>
            <PersonBG
              bg={'#E4D6FF'}
              image={'pngwing.com (80) 1.png'}
              namebg={"purple-800/70"}
              name={'Raj Aryan'}
            />
            <p className='w-full md:w-2/3 text-center font-medium text-base md:mt-0 mt-10'>
              As a mentor, you have the power to inspire, guide, and shape the
              future of eager learners. Our platform enables you to share
              knowledge, connect with motivated students, and build meaningful
              relationships that go beyond classrooms, making a real impact on
              personal and professional growth.
            </p>
          </div>
          <div className='w-full flex md:flex-row flex-col-reverse items-center md:items-end justify-between mt-24 md:mt-5'>
            <p className='w-full md:w-2/3 text-center font-medium text-base md:mt-0 mt-10'>
              As a mentor, you have the power to inspire, guide, and shape the
              future of eager learners. Our platform enables you to share
              knowledge, connect with motivated students, and build meaningful
              relationships that go beyond classrooms, making a real impact on
              personal and professional growth.
            </p>
            <PersonBG
              bg={'#BAD3FC'}
              image={'pngwing.com (84) 1.png'}
              namebg={'blue-400/75'}
              name={'Sameer Roy'}
              nameflip={true}
            />
          </div>
        </div>
      </div>

      <div className='relative w-full min-h-screen overflow-hidden flex justify-center'>
        <div className="absolute inset-0 md:bg-contain bg-cover md:bg-center bg-[url('/Rectangle110891.png')] rotate-180 bg-repeat-x"></div>

        <div className='w-4/5 relative'>
          <img
            src='./Vector 4 (Stroke).png'
            alt='...'
            className='absolute left-10  top-10 md:top-16'
          />

          <div className='md:text-left text-center text-3xl md:text-5xl font-bold'>
            Why Join Us
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 my-30 gap-10 md:gap-20 place-items-center'>
            <Card
              heading={'For Students'}
              image={'Group.png'}
              text={'Join Groups, ask doubts, chat with peers.'}
            />

            <Card
              heading={'For Mentor'}
              image={'Teacher.png'}
              text={'Create groups, guide students, provide resources'}
            />

            <Card
              heading={'Real-time Chat'}
              image={'Chat Bubble.png'}
              text={'Individuals & group communication with instant updates'}
            />
          </div>
          <div className='w-full mt-10'>
            <p className='w-full text-2xl md:text-4xl font-bold text-center'>
              "<span className='text-[#7940E9]'>Frequently</span> Asked
              Questions"
            </p>

            <div className='mt-10'>
              {faqs.map((faq, index) => (
                <div className='my-5' key={index}>
                  <Accordion title={faq.q} content={faq.a} index={index + 1}/>
                </div>
              ))}
            </div>
          </div>

          <div className='w-full my-10'>
            <p className='text-center font-bold text-lg md:text-2xl'>
              Still Have Questions?
            </p>
            <p className='text-center font-semibold md:text-lg leading-5'>
              Reach out to us at tech@solution.com or call at 1800-123-5678
            </p>
          </div>
        </div>
      </div>

      <div className='w-full md:min-h-screen bg-[#7940E9] rounded-tl-3xl rounded-tr-3xl'>
        <div className='h-full p-5'>
          <div className='text-4xl font-bold text-white text-center'>
            What People Say
          </div>
          <div className='text-center text-white text-2xl mt-2'>
            "Discover what our and partners have to say about their journey with
            us — real stories, real experiences."
          </div>

          <div className='w-full h-full flex justify-center'>
            <div className='mt-10 w-[90%] min-h-full'>
              <PeoplesSlider />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-[70vh] flex justify-center items-center flex-col-reverse md:flex-row py-3'>
        <div className='w-4/5 md:w-3/5'>
          <p className='text-[#7940E9] text-3xl md:text-6xl font-bold md:leading-15 text-center md:text-left'>
            Ready to join your learning community?
          </p>
          <button className='bg-[#7940E9] text-white text-lg p-2 rounded-xl mt-5 block mx-auto md:mx-0'>
            Sign up as a student
          </button>
          <button className='bg-[#7940E9] text-white text-lg p-2 rounded-xl mt-5 block mx-auto md:mx-0'>
            Sign up as a Mentor/Admin
          </button>
        </div>
        <div>
          <img src='./Untitled design (21) 1.png' alt='...' />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
