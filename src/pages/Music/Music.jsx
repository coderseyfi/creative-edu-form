import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import MsusicBg from '../../assets/images/music.jpg'

const Music = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const imgUrl = MsusicBg

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
              <h1 className="heading">
                Musiqi Sənayesi Akademiyası
                <br />
                {/* <span className="heading-thin">
                  təlim proqramına qəbul başladı
                </span> */}
              </h1>
              <div className="text-area"></div>
            </div>
          )}
          {/* <FormRow onFormSubmit={hideHeadBox} /> */}
        </div>
      </div>
    </>
  )
}

export default Music
