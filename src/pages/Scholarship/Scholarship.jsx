import { useState } from "react";
import Hero from "../../components/Hero/Hero";
import "../Animator/animator.scss";
import GameBg from "../../assets/images/game.jpg";
import Student from "./components/Student";
import Child from "./components/Child";

const Scholarship = () => {
  const [showHeadBox, setShowHeadBox] = useState(false);

  const hideHeadBox = () => {
    setShowHeadBox(true);
  };

  const handleShowGame = (id) => {
    setShowGameId(id);
  };

  const imgUrl = GameBg;

  return (
    <>
      <Hero img={imgUrl} />
      <section className="animator">
        <div className="container">
          {!showHeadBox && (
            <div className="head-box">
              <h1 className="heading">
                “Mədəniyyət və yaradıcı sənayelər üzrə xüsusi Təqaüd
                Proqramı”nda iştirak etmək üçün elektron ərizə”{" "}
              </h1>
            </div>
          )}
          <Student />
        </div>
      </section>
    </>
  );
};

export default Scholarship;
