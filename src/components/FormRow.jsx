import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Submit from '../assets/ico/submit.svg'

const FormRow = ({ onFormSubmit }) => {
  const [skills, setSkills] = useState([])
  const [levels, setLevels] = useState([])
  const [otherSkill, setOtherSkill] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isValid, setIsValid] = useState()

  let selectedSkills = []
  const setSelectedSkills = (data) => {
    selectedSkills = data
  }

  const fetchData = async () => {
    try {
      const skillResponse = await axios.get(
        'http://backendtestapp.local:8080/api/animator-skill/select-list'
      )
      setSkills(skillResponse.data.data)

      const levelResponse = await axios.get(
        'http://backendtestapp.local:8080/api/english-level/select-list'
      )
      setLevels(levelResponse.data.data)
    } catch (error) {
      console.error('Data fetch error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInput = (value) => {
    console.log(value)
    if (!selectedSkills.includes(value)) {
      setSelectedSkills([...selectedSkills, value])
    } else {
      setSelectedSkills(
        selectedSkills.filter((currentSkill) => currentSkill != value)
      )
    }
    console.log(selectedSkills)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    if (otherSkill.trim().length > 0) {
      selectedSkills.push(otherSkill)
    }

    const data = {
      animator_skills: selectedSkills,
    }

    for (let [name, value] of formData) {
      Object.assign(data, data, { [name]: value })
    }

    try {
      const response = await axios.post(
        'http://backendtestapp.local:8080/api/animator-appeal',
        data
      )

      setFormSubmitted(true)
      console.log('Form submit oldu!', response.data)
    } catch (error) {
      setIsValid(error.response.data.data)
      setFormSubmitted(false)
      console.error('Form submit olunmadı:', error)
    }

    if (typeof onFormSubmit === 'function') {
      onFormSubmit()
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
              Email<span className="star">*</span>
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
              Ad və Soyad<span className="star">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="name_surname"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.name_surname && (
              <span className="valid-msg">{...isValid?.name_surname}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="whatsappNumber">
              WhatsApp nömrəsi (sizinlə WhatsApp vasitəsilə əlaqə saxlanılacaq)
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="whatsappNumber"
              name="wp_phone"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.wp_phone && (
              <span className="valid-msg">{...isValid?.wp_phone}</span>
            )}
          </div>
          <div className="checkbox-field">
            <p>
              Animator peşəsinə aid bacarıqlarınızı qeyd edin:{' '}
              <span className="star">*</span>
            </p>
            <div className="checkbox-wrapper">
              {skills.map((skill) => {
                return (
                  <div key={skill.id} className="checkbox-area">
                    <input
                      type="checkbox"
                      id={`skill_${skill.id}`}
                      onChange={() => handleInput(skill.id)}
                    />
                    <label htmlFor={`skill_${skill.id}`}>{skill.name}</label>
                  </div>
                )
              })}

              <div className="checkbox-area">
                <input
                  type="checkbox"
                  id="otherSkill"
                  // name="skill"
                  // value="Other"
                  className="other-box"
                  onChange={(e) => {
                    setOtherSkill(e.target.value)
                    setIsChecked(e.target.checked)
                  }}
                />

                <label htmlFor="otherSkill">Other:</label>
                {isChecked && (
                  <input
                    onChange={(e) => setOtherSkill(e.target.value)}
                    className="other-inp"
                    type="text"
                  />
                )}
              </div>
              {isValid?.animator_skills && (
                <span className="valid-msg">{...isValid?.animator_skills}</span>
              )}
            </div>
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="experience">
              Animasiyaya aid başqa hansı təcrübəniz var? Məsələn,
              storyboarding, rigging, modelling və s.
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="experience"
              name="animation_experience"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.animation_experience && (
              <span className="valid-msg">
                {...isValid?.animation_experience}
              </span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="programs">
              Hansı proqramlarda işləyə bilirsiniz? Məsələn, Toon Boom, TVpaint,
              Maya və s. <span className="star">*</span>
            </label>
            <input
              type="text"
              id="programs"
              name="program"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.program && (
              <span className="valid-msg">{...isValid?.program}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="filmography">
              Filmoqrafiya (varsa)
            </label>
            <input
              type="text"
              id="filmography"
              name="filmoqrafiya"
              className="input-row"
            />
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="animationSample">
              İşlədiyiniz animasiya nümunəsi (YouTube / Vimeo linki):
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="animationSample"
              name="animation_example"
              className={`input-row ${isValid?.email ? 'err' : ''}`}
            />
            {isValid?.animation_example && (
              <span className="valid-msg">{...isValid?.animation_example}</span>
            )}
          </div>
          <div className="input-field">
            <label className="inp-label" htmlFor="showreel">
              Showreel (varsa) (YouTube / Vimeo linki):
            </label>
            <input
              type="text"
              id="showreel"
              name="showreel"
              className="input-row"
            />
            {isValid?.showreel && (
              <span className="valid-msg">{...isValid?.showreel}</span>
            )}
          </div>
          <div className="radio-field">
            <p className="radio-field__head">
              İngilis dili səviyyəniz<span className="star">*</span>
            </p>
            {levels.map((level) => {
              return (
                <div key={level.id} className="radio-area">
                  <input
                    type="radio"
                    id={`level_${level.id}`}
                    name="english_level"
                    value={level.id}
                    className={isValid ? 'border-red' : ''}
                  />
                  <label htmlFor={`level_${level.id}`} className="radio-label">
                    {level.name}
                  </label>
                </div>
              )
            })}
            {isValid?.english_level && (
              <span className="valid-msg">{...isValid?.english_level}</span>
            )}
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

export default FormRow
