import React from 'react'
import './scroll.scss'

const Hero = ({ img }) => {
  console.log(img)

  return (
    <section className="landing">
      <img src={img} alt="" />
      <p className="mouse">
        <span className="scroll">Aşağı</span>
      </p>
    </section>
  )
}

export default Hero
