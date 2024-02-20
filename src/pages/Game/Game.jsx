import { useState } from "react";
import Hero from "../../components/Hero/Hero";
import "../Animator/animator.scss";
import GameBg from "../../assets/images/game.jpg";
import GameAnimation from "../../components/GameAnimation/GameAnimation";
import GameDesign from "../../components/GameDesign/GameDesign";

const Game = () => {
  const [showHeadBox, setShowHeadBox] = useState(false);
  const [showGameId, setShowGameId] = useState(null);

  const hideHeadBox = () => {
    setShowHeadBox(true);
  };
  const gameContent = {
    1: <GameAnimation onFormSubmit={hideHeadBox} />,
    2: <GameDesign onFormSubmit={hideHeadBox} />,
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
              <h1 className="heading">Oyun Tərtibatçıları Emalatxanası</h1>
              <div className="text-area">
                <p className="text">
                  Oyun Tərtibatçıları Emalatxanası müxtəlif təhsil və inkubasiya
                  proqramları vasitəsi ilə yerli oyun tərtibatçılarının bilik və
                  bacarıqlarının artırılmasına tövhə verir, onlar arasında öz
                  oyun startaplarını yaratmaq istəyən komandalara ideyadan
                  məhsulun hazırlanması prosesinə qədər olan mərhələlərdə
                  mentorluq dəstəyi verir.
                </p>
              </div>
              <div className="game-btns">
                <button
                  className={`btn ${showGameId === 1 ? "active" : ""} `}
                  onClick={() => handleShowGame(1)}
                >
                  <span>Oyun Animasiyası Kursu</span>
                </button>
                <button
                  className={`btn ${showGameId === 2 ? "active" : ""} `}
                  onClick={() => handleShowGame(2)}
                >
                  <span>Oyun Dizaynı Kursu</span>
                </button>
              </div>
            </div>
          )}
          {showGameId !== null && gameContent[showGameId]}
        </div>
      </section>
    </>
  );
};

export default Game;
