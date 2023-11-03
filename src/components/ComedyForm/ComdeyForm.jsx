import React from 'react'
import axios from '../../api/api'
import { useState } from 'react'
import { useEffect } from 'react'
import Submit from '../../assets/ico/submit.svg'
import './comedyform.scss'
import { languages } from '../../constants/constant'
import Spinner from '../Spinner/Spinner'

const experiences = [
  {
    id: 1,
    name: 'Bəli',
  },
  {
    id: 2,
    name: 'Xeyr',
  },
]

const ages = [
  {
    id: 1,
    age: '15-19',
  },
  {
    id: 2,
    age: '20-25',
  },
  {
    id: 3,
    age: '26-35',
  },
  {
    id: 4,
    age: '36-50',
  },
  {
    id: 5,
    age: '50+',
  },
]

const ComedyForm = ({ onFormSubmit }) => {
  const [activities, setActivities] = useState([])
  const [genres, setGenres] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isValid, setIsValid] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [otherSkill, setOtherSkill] = useState('')
  const [languageValid, setLanguageValid] = useState()
  const [otherSubmit, setOtherSubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/comedy/activities')
      setActivities(data.data)

      const genreInfos = await axios.get('/comedy/genres')
      setGenres(genreInfos.data.data)
    } catch (error) {
      console.error('Data fetch error:', error)
    }
  }

  const handleInput = (languageName) => {
    if (!selectedLanguages.includes(languageName)) {
      setSelectedLanguages([...selectedLanguages, languageName])
    } else {
      setSelectedLanguages(
        selectedLanguages.filter((name) => name !== languageName)
      )
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const validateForm = (formData) => {
    const errors = {}

    if (!formData.name_surname) {
      errors.name_surname = 'Ad və soyad boş buraxıla bilməz'
    }

    if (!formData.wp_phone) {
      errors.wp_phone = 'WhatsApp nömrəsi boş buraxıla bilməz'
    }

    if (!formData.email) {
      errors.email = 'E-mail ünvan boş buraxıla bilməz'
    }

    if (!formData.age) {
      errors.age = 'Yaşınız boş buraxıla bilməz'
    }

    if (!formData.activity_field) {
      errors.activity_field = 'Fəaliyyət sahəsi boş buraxıla bilməz'
    }

    if (!formData.have_experience) {
      errors.have_experience = 'Komediya təcrübəniz boş buraxıla bilməz'
    }

    if (!formData.learn_genre) {
      errors.learn_genre = 'Öyrənmək istədiyiniz janr boş buraxıla bilməz'
    }

    if (selectedLanguages.length === 0 && !isChecked) {
      errors.language = 'Dil bacarıqlarınız boş buraxıla bilməz'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const formObject = {}

    formObject['language'] = selectedLanguages

    formData.forEach((value, key) => {
      formObject[key] = value.trim()
    })

    if (isChecked && otherSkill.trim().length > 0 && !otherSubmit) {
      selectedLanguages.push(otherSkill)
      setOtherSubmit(true)
    }

    if (selectedLanguages.length === 0) {
      setLanguageValid({
        ...languageValid,
        language: 'Dil bacarıqlarınız boş buraxıla bilməz',
      })
    } else {
      setLanguageValid({ ...languageValid, language: null })
    }

    const formErrors = validateForm(formObject)

    if (Object.keys(formErrors).length > 0) {
      setIsValid(formErrors)
      return
    }

    for (const key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        if (formObject[key] === '' || formObject[key] === null) {
          formObject[key] = null
        }
      }
    }

    try {
      setLoading(true)
      const response = await axios.post('/comedy-appeal', formObject)
      setFormSubmitted(true)

      if (typeof onFormSubmit === 'function') {
        onFormSubmit()
      }
    } catch (error) {
      setIsValid(error.response.data.data)
      setFormSubmitted(false)
      console.error('Form submit olunmadı:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-area">
      {formSubmitted ? (
        <div className="form-submit-message">
          <div className="submit-box">
            <img src={Submit} alt="" />
            <p className="success">Müraciətiniz uğurla göndərildi</p>
          </div>
        </div>
      ) : loading ? (
        <Spinner />
      ) : null
      // <form className="form" onSubmit={handleSubmit}>
      //   <div className="input-field">
      //     <label className="inp-label" htmlFor="email">
      //       Ad və Soyad<span className="star">*</span>
      //     </label>
      //     <input
      //       type="text"
      //       id="email"
      //       name="name_surname"
      //       className={`input-row ${isValid?.name_surname ? 'err' : ''}`}
      //     />
      //     {isValid?.name_surname && (
      //       <span className="valid-msg">{...isValid?.name_surname}</span>
      //     )}
      //   </div>
      //   <div className="input-field">
      //     <label className="inp-label" htmlFor="wp_phone">
      //       WhatsApp nömrəsi (sizinlə WhatsApp vasitəsilə əlaqə saxlanılacaq)
      //       <span className="star">*</span>
      //     </label>
      //     <input
      //       type="text"
      //       id="wp_phone"
      //       name="wp_phone"
      //       className={`input-row ${isValid?.wp_phone ? 'err' : ''}`}
      //     />
      //     {isValid?.wp_phone && (
      //       <span className="valid-msg">{...isValid?.wp_phone}</span>
      //     )}
      //   </div>
      //   <div className="input-field">
      //     <label className="inp-label" htmlFor="email">
      //       E-mail ünvan<span className="star">*</span>
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
      //   <div className="radio-field radio-music">
      //     <p className="radio-field__head">
      //       Sizin yaşınız?
      //       <span className="star">*</span>
      //     </p>
      //     {ages.map((age) => {
      //       return (
      //         <div key={age.id} className="radio-area">
      //           <input
      //             type="radio"
      //             id={`age_${age.id}`}
      //             name="age"
      //             value={age.age}
      //           />
      //           <label htmlFor={`age_${age.id}`} className="radio-label">
      //             {age.age}
      //           </label>
      //         </div>
      //       )
      //     })}
      //     {isValid?.age && (
      //       <span className="valid-msg">{...isValid?.age}</span>
      //     )}
      //   </div>
      //   <div className="radio-field radio-music">
      //     <p className="radio-field__head">
      //       Fəaliyyət sahəsi <span className="star">*</span>
      //     </p>
      //     {activities.map((activity) => {
      //       return (
      //         <div key={activity.id} className="radio-area">
      //           <input
      //             type="radio"
      //             id={`activity_${activity.id}`}
      //             name="activity_field"
      //             value={activity.id}
      //           />
      //           <label
      //             htmlFor={`activity_${activity.id}`}
      //             className="radio-label">
      //             {activity.name}
      //           </label>
      //         </div>
      //       )
      //     })}
      //     {isValid?.activity_field && (
      //       <span className="valid-msg">{...isValid?.activity_field}</span>
      //     )}
      //   </div>
      //   <div className="radio-field radio-music">
      //     <p className="radio-field__head">
      //       Komediya sahəsində təcrübəniz varmı?
      //       <span className="star">*</span>
      //     </p>
      //     {experiences.map((experience) => {
      //       return (
      //         <div key={experience.id} className="radio-area">
      //           <input
      //             type="radio"
      //             id={`experience_${experience.id}`}
      //             name="have_experience"
      //             value={experience.id}
      //           />
      //           <label
      //             htmlFor={`experience_${experience.id}`}
      //             className="radio-label">
      //             {experience.name}
      //           </label>
      //         </div>
      //       )
      //     })}
      //     {isValid?.have_experience && (
      //       <span className="valid-msg">{...isValid?.have_experience}</span>
      //     )}
      //   </div>
      //   <div className="radio-field radio-music">
      //     <p className="radio-field__head">
      //       Hansı komediya janrını öyrənmək istərdiniz?
      //       <span className="star">*</span>
      //     </p>
      //     {genres.map((genre) => {
      //       return (
      //         <div key={genre.id} className="radio-area">
      //           <input
      //             type="radio"
      //             id={`level_${genre.id}`}
      //             name="learn_genre"
      //             value={genre.id}
      //           />
      //           <label htmlFor={`level_${genre.id}`} className="radio-label">
      //             {genre.name}
      //           </label>
      //         </div>
      //       )
      //     })}
      //     {isValid?.learn_genre && (
      //       <span className="valid-msg">{...isValid?.learn_genre}</span>
      //     )}
      //   </div>
      //   <div className="checkbox-field">
      //     <p>
      //       Dil bacarıqlarınız
      //       <span className="star">*</span>
      //     </p>
      //     <div className="checkbox-wrapper">
      //       {languages.map((language) => {
      //         return (
      //           <div key={language.id} className="checkbox-area">
      //             <input
      //               type="checkbox"
      //               id={`language_${language.id}`}
      //               onChange={() => handleInput(language.name)}
      //             />
      //             <label htmlFor={`language_${language.id}`}>
      //               {language.name}
      //             </label>
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

      //       {languageValid?.language && (
      //         <span className="valid-msg">{...languageValid?.language}</span>
      //       )}
      //     </div>
      //   </div>
      //   <div className="btn-field">
      //     <button type="submit" className="form-btn">
      //       <span className="form-btn__text">Göndər</span>
      //     </button>
      //   </div>
      // </form>
      }
    </div>
  )
}

export default ComedyForm
