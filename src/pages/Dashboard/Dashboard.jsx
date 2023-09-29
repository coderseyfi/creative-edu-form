import React from 'react'
import { Link } from 'react-router-dom'
import DashLine from '../../assets/ico/dashLine.svg'
import './dashboard.scss'
import { DUMMY_DASHBOARD } from '../../constants/constant'

const Dashboard = () => {

  
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
              davamlıqı, xarici ekspertlərin mentorluqu
            </p>
          </div>
          <div className="mid__info">
            <img src={DashLine} alt="" />
            <p className="mid__info__text">
              Əsas meyarlar: Rəsmi sertifikatlaşma, işlə təmin olunma, 8 həftə
              davamlıqı, xarici ekspertlərin mentorluqu
            </p>
          </div>
        </div>
        <div className="bottom">
          {DUMMY_DASHBOARD.map(({ id, ico, text, to }) => {
            return (
              <Link to={to} key={id} className="bottom__link">
                <img src={ico} />
                <p className="bottom__link__text">{text}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
