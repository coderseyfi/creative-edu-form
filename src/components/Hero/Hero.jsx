import React from 'react'

const Hero = ({ img }) => {
  console.log(img)

  return (
    <section
      className="landing"
      style={{ backgroundImage: `url(${img})` }}
    ></section>
  )
}

export default Hero
