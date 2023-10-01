import React from 'react'
import './scroll.scss'

const Hero = ({ img }) => {
  return (
    <div className="img-box">
      <img src={img} alt="" />
      <p className="mouse">
        <span className="scroll">Aşağı</span>
      </p>
    </div>
  )
}

export default Hero
