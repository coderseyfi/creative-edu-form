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
                “Animator’s Accelerator”
                <br />
                <span className="heading-thin">
                  təlim proqramına qəbul başladı
                </span>
              </h1>
              <div className="text-area">
                <p className="text">
                  Yerli animatorların kvalifikasiyasının artırılması məqsədilə
                  “Animator’s Accelerator” təlim proqramının qəbuluna start
                  verilib. Altı aylıq təlim proqramında iştirakdan sonra
                  animatorlar beynəlxalq layihələrə cəlb ediləcək.
                </p>
                <br />
                <p className="text">
                  Qeydiyyat sentyabrın 30-na qədər davam edəcək. Təlim
                  proqramında iştirak üçün aşağıdaki formanı doldurmağınız xahiş
                  olunur.
                </p>
                <br />
                <p className="text">
                  Mentorlar arasında “Lakeside” animasiya studiyasının kreativ
                  direktoru Matthew Lyon da var. Onun beynəlxalq miqyasda qəbul
                  edilmiş işlərini “Netflix”dən tutmuş “Apple TV”yə qədər bütün
                  əsas beynəlxalq yayım platformalarında görmək olar və həmişə
                  bütün dünya tamaşaçıları tərəfindən hörmətlə qarşılanıb.
                </p>
                <br />

                <p className="text">
                  “Animator’s Accelerator” təlim proqramı Azərbaycan
                  Respublikası Mədəniyyət Nazirliyinin dəstəyilə Alove Animasiya
                  Studiyası tərəfindən təşkil olunur.
                </p>
                <br />
                <p>Təlimdə iştirak üçün ödəniş tələb olunmur.</p>
              </div>
            </div>
          )}
          <ProcudersForm onFormSubmit={hideHeadBox} />
        </div>
      </section>
    </>
  )
}

export default Procuders
