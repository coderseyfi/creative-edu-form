import { useState } from "react";
import Hero from "../../components/Hero/Hero";
import "../Animator/animator.scss";
import TechBg from "../../assets/images/tech.jpg";
import CulTechForm from "../../components/CulTech/CultechForm";

const Cultech = () => {
  const [showHeadBox, setShowHeadBox] = useState(false);

  const hideHeadBox = () => {
    setShowHeadBox(true);
  };

  const imgUrl = TechBg;

  return (
    <>
      <Hero img={imgUrl} />
      <section className="animator">
        <div className="container">
          {!showHeadBox && (
            <div className="head-box">
              <h1 className="heading">CulTech Akademiyası</h1>
              <div className="text-area">
                <p className="text">
                  Cultech Akademiyası öz təhsil proqramları vasitəsi ilə
                  mədəniyyət texnologiyaları sahəsində fəaliyyət göstərmək
                  istəyən mütəxəssislərin bilik və bacarıqlarının artırılmasına
                  köməklik edir. Mədəni irsin rəqəmsallaşdırılması istiqamətində
                  proqramlaşdırma kursunun nəznində mobil proqramlaşdırma
                  (Flutter) və artırılmış reallıq (AR) texnologiyaları tədris
                  olunacaq.
                </p>
              </div>
            </div>
          )}
          <CulTechForm onFormSubmit={hideHeadBox} />
        </div>
      </section>
    </>
  );
};

export default Cultech;
