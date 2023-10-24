import { useState } from 'react'
import FormRow from '../../components/FormRow/FormRow'
import Hero from '../../components/Hero/Hero'
import './animator.scss'
import AnimatorBg from '../../assets/images/animatorbg.jpg'

const Animator = () => {
  const [showHeadBox, setShowHeadBox] = useState(false)

  const imgUrl = AnimatorBg

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
                “Animator’s Accelerator”
                <br />
                <span className="heading-thin">
                  təlim proqramına qəbul başladı
                </span>
              </h1>
              <h3 className="form-over">Qeydiyyat başa çatmışdır</h3>
              {/* <div className="text-area">
                <p className="text">
                  Yerli animatorların kvalifikasiyasının artırılması məqsədilə
                  “Animator’s Accelerator” təlim proqramının qəbuluna start
                  verilib. Altı aylıq təlim proqramında iştirakdan sonra
                  animatorlar beynəlxalq layihələrə cəlb ediləcək.
                </p>
                <br />
                <p className="text">
                  Qeydiyyat oktyabrın 8-nə qədər davam edəcək. Təlim proqramında
                  iştirak üçün aşağıdaki formanı doldurmağınız xahiş olunur.
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
                  Respublikası Mədəniyyət Nazirliyinin dəstəyilə Animasiya
                  Studiyası tərəfindən təşkil olunur.
                </p>
                <br />
                <p className="bold-text">
                  Təlimdə iştirak üçün ödəniş tələb olunmur.
                </p>
              </div> */}
            </div>
          )}
          <FormRow onFormSubmit={hideHeadBox} />
        </div>
      </div>
    </>
  )
}

export default Animator
