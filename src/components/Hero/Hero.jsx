import React from 'react'
import './scroll.scss'

const Hero = ({ img }) => {
  console.log(img)

  return (
    <section className="landing" style={{ backgroundImage: `url(${img})` }}>
      <p className="mouse">
        <span className="scroll">Aşağı</span>
      </p>
    </section>
  )
}

export default Hero
