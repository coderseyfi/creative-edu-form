import React, { useState } from 'react'
import DashLine from '../../assets/ico/dashLine.svg'
import './dashboard.scss'
import { DUMMY_DASHBOARD } from '../../constants/constant'
import Animator from '../Animator/Animator'
import Procuders from '../Procuders/Procuders'
import Modal from '../../components/Modal/Modal'
import Comedia from '../../pages/Comedia/Comedia'
import Game from '../../pages/Game/Game'

const Dashboard = () => {
  const [openModalId, setOpenModalId] = useState(null)

  const openModal = (id) => {
    setOpenModalId(id)
  }

  const closeModal = () => {
    setOpenModalId(null)
  }

  const modalContent = {
    // 1: <Animator />,
    2: <Animator />,
    3: <Procuders />,
    4: <Comedia />,
    // 4: <Comedia />,
    6: <Game />,
  }

  return (
    <section className="dashboard">
      <div className="container-d">
        <div className="up">
          <h1 className="up__title">MYS üzrə tədris və inkubasiya mərkəzi</h1>
        </div>
        <div className="mid">
          <div className="mid__info">
            <img src={DashLine} alt="" />
            <p className="mid__info__text">
              Əsas meyarlar: Rəsmi sertifikatlaşma, işlə təmin olunma, 8 həftə
              davamlılıq, Xarici ekspertlərin mentorluğu
            </p>
          </div>
        </div>
        <div className="bottom">
          {DUMMY_DASHBOARD.map(({ id, ico, text }) => {
            return (
              <div
                key={id}
                className={`bottom__link ${
                  id === 1 || id === 5 ? 'no-click' : ''
                }`}
                onClick={() => openModal(id)}
              >
                <img src={ico} alt="" />
                <p className="bottom__link__text">{text}</p>
              </div>
            )
          })}
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
  )
}

export default Dashboard
