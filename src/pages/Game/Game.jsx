import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import GameBg from '../../assets/images/game.jpg'

const Game = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const imgUrl = GameBg

  const hideHeadBox = () => {
    setShowHeadBox(true)
  }
  return (
    <>
      <Hero img={imgUrl} />
      <section className="animator">
        <div className="container">
          {!showHeadBox && (
            <div className="head-box">
              <h1 className="heading">
                Oyun Tərtibatçıları Emalatxanası
                <br />
                <span className="heading-thin">
                  təlim proqramına qəbul başladı
                </span>
              </h1>
              <div className="text-area">
                <p className="text">
                  Oyun Tərtibatçıları Emalatxanası müxtəlif təhsil və inkubasiya
                  proqramları vasitəsi ilə yerli oyun tərtibatçılarının bilik və
                  bacarıqlarının artırılmasına tövhə verir, oyun tərtibatçıları
                  arasından öz oyun startapları yaratmatmaq istəyən komandalara
                  ideyadan məhsulun hazırlanması prosesinə qədər olan
                  mərhələlərdə mentorluq dəstəyi verir.
                </p>
              </div>
            </div>
          )}
          {/* <FormRow onFormSubmit={hideHeadBox} /> */}
        </div>
      </section>
    </>
  )
}

export default Game
