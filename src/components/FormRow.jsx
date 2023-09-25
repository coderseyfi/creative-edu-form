import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const FormRow = () => {
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [levels, setLevels] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    formData.append('animator_skills', JSON.stringify(selectedSkills))

    try {
      const response = await axios.post(
        'http://backendtestapp.local:8080/api/animator-appeal',
        formData
      )

      console.log('Form submit oldu!', response.data)
    } catch (error) {
      console.error('Form submit olunmadı:', error)
    }
  }

  return (
    <div className="form-area">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label className="inp-label" htmlFor="email">
            Email<span className="star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-row"
            required
          />
        </div>
        <div className="input-field">
          <label className="inp-label" htmlFor="fullName">
            Ad və Soyad<span className="star">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="name_surname"
            className="input-row"
            required
          />
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
            className="input-row"
            required
          />
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
                    value={skill.name}
                  />
                  <label htmlFor={`skill_${skill.id}`}>{skill.name}</label>
                </div>
              )
            })}

            <div className="checkbox-area">
              <input
                type="checkbox"
                id="otherSkill"
                name="skills"
                value="Other"
              />
              <label htmlFor="otherSkill">Other:</label>
            </div>
          </div>
        </div>
        <div className="input-field">
          <label className="inp-label" htmlFor="experience">
            Animasiyaya aid başqa hansı təcrübəniz var? Məsələn, storyboarding,
            rigging, modelling və s.<span className="star">*</span>
          </label>
          <input
            type="text"
            id="experience"
            name="animation_experience"
            className="input-row"
            required
          />
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
            className="input-row"
            required
          />
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
            className="input-row"
            required
          />
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
                  value={level.name}
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
    </div>
  )
}

export default FormRow
