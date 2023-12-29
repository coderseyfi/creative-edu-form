import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import MsusicBg from '../../assets/images/music.jpg'
import MusicForm from '../../components/MusicForm/MusicForm'

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
              <h1 className="heading">Musiqi Sənayesi Akademiyası</h1>
              <div className="text-area"></div>
            </div>
          )}
          <MusicForm onFormSubmit={hideHeadBox} />
        </div>
      </div>
    </>
  )
}

export default Music
