import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import GraphicBg from '../../assets/images/qrafik.jpg'

const Graphic = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const imgUrl = GraphicBg

  const hideHeadBox = () => {
    setShowHeadBox(true)
  }
  return (
    <>
      <Hero img={imgUrl} />
      <div className="animator">
        <div className="container">
          {!showHeadBox && (
            <div className="head-box">
              <h1 className="heading">Qrafik Dizaynda Milli Kod</h1>
              <div className="text-area"></div>
            </div>
          )}
          {/* <FormRow onFormSubmit={hideHeadBox} /> */}
        </div>
      </div>
    </>
  )
}

export default Graphic
