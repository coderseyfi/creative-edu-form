import { useState } from 'react'
import ProcudersForm from '../../components/ProcudersForm/ProcudersForm'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import Pro from '../../assets/images/pro.jpg'

const Procuders = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const hideHeadBox = () => {
    setShowHeadBox(true)
  }
  return (
    <>
      <Hero img={Pro} />
      <section className="animator">
        <div className="container">
          {!showHeadBox && (
            <div className="head-box">
              <h1 className="heading">
                Procuders Elevator
                <br />
                <span className="heading-thin">
                  təlim proqramına qəbul başladı
                </span>
              </h1>
              <h3 className="form-over">Qeydiyyat başa çatmışdır</h3>

              {/* <div className="text-area">
                <p className="bold-text">
                  Təlimdə iştirak üçün ödəniş tələb olunmur.
                </p>
              </div> */}
            </div>
          )}
          <ProcudersForm onFormSubmit={hideHeadBox} />
        </div>
      </section>
    </>
  )
}

export default Procuders
