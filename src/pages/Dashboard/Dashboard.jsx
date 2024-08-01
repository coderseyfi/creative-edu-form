import { useState } from "react";
import DashLine from "../../assets/ico/dashLine.svg";
import "./dashboard.scss";
import { DUMMY_DASHBOARD } from "../../constants/constant";
import Animator from "../Animator/Animator";
import Procuders from "../Procuders/Procuders";
import Modal from "../../components/Modal/Modal";
import Comedia from "../../pages/Comedia/Comedia";
import Game from "../../pages/Game/Game";
import Music from "../Music/Music";
import Graphic from "../Graphic/Graphic";
import Cultech from "../CulTech/Cultech";
import Scholarship from "../Scholarship/Scholarship";

const Dashboard = () => {
  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (id) => {
    setOpenModalId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const modalContent = {
    1: <Music />,
    2: <Animator />,
    3: <Procuders />,
    4: <Comedia />,
    5: <Graphic />,
    6: <Game />,
    7: <Cultech />,
    8: <Scholarship />,
  };

  return (
    <section className="dashboard">
      <div className="container-d">
        <div className="up">
          <h1 className="up__title">
            MYS üzrə tədris proqramlarına qoşulmaq üçün qeydiyyat
          </h1>
        </div>
        <div className="mid">
          <div className="mid__info">
            <div className="">
              <img src={DashLine} alt="" />
              <p className="mid__info__text">
                Əsas meyarlar: Rəsmi sertifikatlaşma, işlə təmin olunma, 8 həftə
                davamlılıq, Xarici ekspertlərin mentorluğu
              </p>
            </div>
            <div className="">
              <img src={DashLine} alt="" />
              <p className="mid__info__text">
                Bacarıqların artırılması proqramları Yaradıcı Sənayelər
                Qovşağında <i>(CreativeHub)</i> həyata keçiriləcəkdir.
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="grid">
            {DUMMY_DASHBOARD.slice(0, 4).map(({ id, ico, text }) => {
              return (
                <div
                  key={id}
                  className="grid__link"
                  onClick={() => openModal(id)}
                >
                  <img src={ico} alt="" />
                  <p className="grid__link__text">{text}</p>
                </div>
              );
            })}
          </div>
          <div className="grid">
            {DUMMY_DASHBOARD.slice(4).map(({ id, ico, text }) => {
              return (
                <div
                  key={id}
                  className="grid__link"
                  onClick={() => openModal(id)}
                >
                  <img src={ico} alt="" />
                  <p className="grid__link__text">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {openModalId !== null && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={DUMMY_DASHBOARD[openModalId - 1].text}
        >
          {modalContent[openModalId]}
        </Modal>
      )}
    </section>
  );
};

export default Dashboard;
