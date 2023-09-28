import React from 'react'
import axios from '../../api/api'
import { useState } from 'react'
import { useEffect } from 'react'
import Submit from '../../assets/ico/submit.svg'

const ProcudersForm = ({ onFormSubmit }) => {
  const [levels, setLevels] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isValid, setIsValid] = useState()

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/english-level/select-list')
      setLevels(data.data)
    } catch (error) {
      console.error('Data fetch error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    for (const key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        if (formObject[key] === '' || formObject[key] === null) {
          formObject[key] = null
        }
      }
    }

    try {
      const response = await axios.post('producer-appeal', formObject)
      setFormSubmitted(true)
      console.log('Form submit oldu!', response.data)
      if (typeof onFormSubmit === 'function') {
        onFormSubmit()
      }
    } catch (error) {
      setIsValid(error.response.data.data)
      setFormSubmitted(false)
      console.error('Form submit olunmadı:', error)
    }
  }

  return (
    <div className="form-area">
      {formSubmitted ? (
        <div className="form-submit-message">
          <div className="submit-box">
            <img src={Submit} alt="" />
            <p className="success">Uğurlu göndərildi</p>
          </div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label className="inp-label" htmlFor="email">
              Elektron poçt ünvanı<span className="star">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.email && (
              <span className="valid-msg">{...isValid?.email}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="fullName">
              Ad, soyad, atanızın adı<span className="star">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="name_surname"
              className={`input-row ${isValid?.name_surname ? 'err' : ''}`}
            />
            {isValid?.name_surname && (
              <span className="valid-msg">{...isValid?.name_surname}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="whatsappNumber">
              Telefon nömrəsi (sizinlə əlaqə saxlanılacaq):
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="whatsappNumber"
              name="wp_phone"
              className={`input-row ${isValid?.wp_phone ? 'err' : ''}`}
            />
            {isValid?.wp_phone && (
              <span className="valid-msg">{...isValid?.wp_phone}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="education">
              Təhsiliniz:
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="education"
              name="education"
              className={`input-row ${isValid?.education ? 'err' : ''}`}
            />
            {isValid?.animation_experience && (
              <span className="valid-msg">
                {...isValid?.animation_experience}
              </span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="film_experience">
              Kino sahəsində təcrübəniz varmı? (məcburi deyil){' '}
            </label>
            <textarea
              type="text"
              row="1"
              id="film_experience"
              name="film_experience"
              className={`input-row`}
            />
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="filmography">
              Filmoqrafiya (varsa) (YouTube / Vimeo linki):
            </label>
            <textarea
              type="text"
              id="filmography"
              name="filmoqrafiya"
              className="input-row"
            />
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="film_example">
              Hazırda işlədiyiniz kino layihəsi (varsa) (YouTube / Vimeo linki)
              :<span className="star">*</span>
            </label>
            <input
              type="text"
              id="film_example"
              name="film_example"
              className={`input-row ${isValid?.film_example ? 'err' : ''}`}
            />
            {isValid?.film_example && (
              <span className="valid-msg">{...isValid?.film_example}</span>
            )}
          </div>

          <div className="radio-field">
            <p className="radio-field__head">
              İngilis dili səviyyəniz (vacib deyil)
            </p>
            {levels.map((level) => {
              return (
                <div key={level.id} className="radio-area">
                  <input
                    type="radio"
                    id={`level_${level.id}`}
                    name="english_level"
                    value={level.id}
                  />
                  <label htmlFor={`level_${level.id}`} className="radio-label">
                    {level.name}
                  </label>
                </div>
              )
            })}
          </div>
          <div className="btn-field">
            <button type="submit" className="form-btn">
              <span className="form-btn__text">Göndər</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProcudersForm
