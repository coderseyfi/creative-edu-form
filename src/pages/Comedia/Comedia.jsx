import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import '../Animator/animator.scss'
import ComediaBg from '../../assets/images/Comedy.jpg'

const Comedia = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const imgUrl = ComediaBg

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
              <h1 className="heading">Komediya və performans məktəbi</h1>
              <div className="text-area">
                <p className="text">
                  Komediya və performans məktəbi 15-99 yaş arası insanların
                  sosial bacarıqlarını, ünsiyyət bacarıqlarını təkmilləşdirə və
                  yumor hissini inkişaf etdirə, ən əsası isə peşəyə yiyələnən
                  bir qurumdur.
                </p>
                <br />
                <p className="text">
                  Məqsədimiz insanlara səhnədə öz potensiallarına çatmaqda kömək
                  etməkdir. Məktəbimizdə təhsili başa vuran məzunlar təkcə
                  peşəkar komediyaçı deyil, həm də aparıcı, aktyor, ictimai
                  xadim və hətta ssenarist ola bilərlər.
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

export default Comedia
