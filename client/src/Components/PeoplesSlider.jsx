import React from 'react'
import Slider from 'react-slick'
import PeopleCard from './PeopleCard'

const NextArrow = props => {
  return (
    <div
      className={`bg-[#7940E9] inline-block rounded-full -rotate-90  ${props.className}`}
      onClick={props.onClick}
      style={props.style}
    >
      <img src='./Vector2.png' alt='...' className='w-5' />
    </div>
  )
}

const PrevArrow = props => {
  return (
    <div
      className={`bg-[#7940E9] inline-block rounded-full rotate-90  ${props.className}`}
      onClick={props.onClick}
      style={props.style}
    >
      <img src='./Vector2.png' alt='...' className='w-5' />
    </div>
  )
}

const PeoplesSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet/laptop
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // small tablets / landscape phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, // phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className='w-full min-h-full slider-container'>
      <Slider {...settings} className='w-full h-full '>
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
      </Slider>
    </div>
  )
}

export default PeoplesSlider
