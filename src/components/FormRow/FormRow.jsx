import React from 'react'
import axios from '../../api/api'
import { useState } from 'react'
import { useEffect } from 'react'
import Submit from '../../assets/ico/submit.svg'

const FormRow = ({ onFormSubmit }) => {
  const [skills, setSkills] = useState([])
  const [levels, setLevels] = useState([])
  const [otherSkill, setOtherSkill] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isValid, setIsValid] = useState()
  const [selectedSkills, setSelectedSkills] = useState([])
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
    e.target.style.height = '60px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const fetchData = async () => {
    try {
      const skillResponse = await axios.get('/animator-skill/select-list')
      setSkills(skillResponse.data.data)

      const levelResponse = await axios.get('/english-level/select-list')
      setLevels(levelResponse.data.data)
    } catch (error) {
      console.error('Data fetch error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function handleInput(id) {
    if (!selectedSkills.includes(id)) {
      setSelectedSkills([...selectedSkills, id])
    } else {
      setSelectedSkills(
        selectedSkills.filter((currentSkill) => currentSkill != id)
      )
    }
    console.log(selectedSkills)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      animator_skills: selectedSkills,
    }

    for (let [name, value] of formData) {
      Object.assign(data, data, { [name]: value })
    }

    if (otherSkill.trim().length > 0) {
      if (isChecked) {
        selectedSkills.push(otherSkill)
      }
    }

    try {
      const response = await axios.post('animator-appeal', data)
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
    <>
    
      <div className="form-area">
        {
          formSubmitted ? (
            <div className="form-submit-message">
              <div className="submit-box">
                <img src={Submit} alt="" />
                <p className="success">Müraciətiniz uğurla göndərildi</p>
              </div>
            </div>
          ) : null
          // <form className="form" onSubmit={handleSubmit}>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="email">
          //       Email<span className="star">*</span>
          //     </label>
          //     <input
          //       type="email"
          //       id="email"
          //       name="email"
          //       className={`input-row ${isValid?.email ? 'err' : ''}`}
          //     />
          //     {isValid?.email && (
          //       <span className="valid-msg">{...isValid?.email}</span>
          //     )}
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="fullName">
          //       Ad və Soyad<span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="fullName"
          //       name="name_surname"
          //       className={`input-row ${isValid?.name_surname ? 'err' : ''}`}
          //     />
          //     {isValid?.name_surname && (
          //       <span className="valid-msg">{...isValid?.name_surname}</span>
          //     )}
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="whatsappNumber">
          //       WhatsApp nömrəsi (sizinlə WhatsApp vasitəsilə əlaqə saxlanılacaq)
          //       <span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="whatsappNumber"
          //       name="wp_phone"
          //       className={`input-row ${isValid?.wp_phone ? 'err' : ''}`}
          //     />
          //     {isValid?.wp_phone && (
          //       <span className="valid-msg">{...isValid?.wp_phone}</span>
          //     )}
          //   </div>
          //   <div className="checkbox-field">
          //     <p>
          //       Animator peşəsinə aid bacarıqlarınızı qeyd edin:{' '}
          //       <span className="star">*</span>
          //     </p>
          //     <div className="checkbox-wrapper">
          //       {skills.map((skill) => {
          //         return (
          //           <div key={skill.id} className="checkbox-area">
          //             <input
          //               type="checkbox"
          //               id={`skill_${skill.id}`}
          //               onChange={() => handleInput(skill.id)}
          //             />
          //             <label htmlFor={`skill_${skill.id}`}>{skill.name}</label>
          //           </div>
          //         )
          //       })}

          //       <div className="checkbox-area">
          //         <input
          //           type="checkbox"
          //           id="otherSkill"
          //           className="other-box"
          //           onChange={(e) => {
          //             setIsChecked(e.target.checked)
          //           }}
          //         />

          //         <label htmlFor="otherSkill">Other:</label>
          //         {isChecked && (
          //           <input
          //             onChange={
          //               isChecked
          //                 ? (e) => setOtherSkill(e.target.value)
          //                 : () => {}
          //             }
          //             className="other-inp"
          //             type="text"
          //           />
          //         )}
          //       </div>
          //       {isValid?.animator_skills && (
          //         <span className="valid-msg">{...isValid?.animator_skills}</span>
          //       )}
          //     </div>
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="experience">
          //       Animasiyaya aid başqa hansı təcrübəniz var? Məsələn,
          //       storyboarding, rigging, modelling və s.
          //       <span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="experience"
          //       name="animation_experience"
          //       className={`input-row ${
          //         isValid?.animation_experience ? 'err' : ''
          //       }`}
          //     />
          //     {isValid?.animation_experience && (
          //       <span className="valid-msg">
          //         {...isValid?.animation_experience}
          //       </span>
          //     )}
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="programs">
          //       Hansı proqramlarda işləyə bilirsiniz? Məsələn, Toon Boom, TVpaint,
          //       Maya və s. <span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="programs"
          //       name="program"
          //       className={`input-row ${isValid?.program ? 'err' : ''}`}
          //     />
          //     {isValid?.program && (
          //       <span className="valid-msg">{...isValid?.program}</span>
          //     )}
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="filmography">
          //       Filmoqrafiya (varsa)
          //     </label>
          //     <textarea
          //       type="text"
          //       id="filmography"
          //       name="filmoqrafiya"
          //       className="input-row"
          //       onChange={handleChange}
          //     />
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="animationSample">
          //       İşlədiyiniz animasiya nümunəsi (YouTube / Vimeo linki):
          //       <span className="star">*</span>
          //     </label>
          //     <textarea
          //       type="text"
          //       onChange={handleChange}
          //       id="animationSample"
          //       name="animation_example"
          //       className={`input-row ${isValid?.animation_example ? 'err' : ''}`}
          //     />
          //     {isValid?.animation_example && (
          //       <span className="valid-msg">{...isValid?.animation_example}</span>
          //     )}
          //   </div>
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="showreel">
          //       Showreel (varsa) (YouTube / Vimeo linki):
          //     </label>
          //     <textarea
          //       type="text"
          //       onChange={handleChange}
          //       id="showreel"
          //       name="showreel"
          //       className="input-row"
          //     />
          //     {isValid?.showreel && (
          //       <span className="valid-msg">{...isValid?.showreel}</span>
          //     )}
          //   </div>
          //   <div className="radio-field">
          //     <p className="radio-field__head">
          //       İngilis dili səviyyəniz<span className="star">*</span>
          //     </p>
          //     {levels.map((level) => {
          //       return (
          //         <div key={level.id} className="radio-area">
          //           <input
          //             type="radio"
          //             id={`level_${level.id}`}
          //             name="english_level"
          //             value={level.id}
          //             className={isValid?.english_level ? 'border-red' : ''}
          //           />
          //           <label htmlFor={`level_${level.id}`} className="radio-label">
          //             {level.name}
          //           </label>
          //         </div>
          //       )
          //     })}
          //     {isValid?.english_level && (
          //       <span className="valid-msg">{...isValid?.english_level}</span>
          //     )}
          //   </div>
          //   <div className="btn-field">
          //     <button type="submit" className="form-btn">
          //       <span className="form-btn__text">Göndər</span>
          //     </button>
          //   </div>
          // </form>
        }
      </div>
    </>
  )
}

export default FormRow
