import React from "react";
import axios from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import Submit from "../../assets/ico/submit.svg";
import { languages } from "../../constants/constant";

const GameDesign = ({ onFormSubmit }) => {
  const [eduLevels, setEduLevels] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isValid, setIsValid] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [languageValid, setLanguageValid] = useState();
  const [otherSubmit, setOtherSubmit] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/game-design/educations");
      setEduLevels(data.data);
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  };

  const handleInput = (languageName) => {
    if (!selectedLanguages.includes(languageName)) {
      setSelectedLanguages([...selectedLanguages, languageName]);
    } else {
      setSelectedLanguages(
        selectedLanguages.filter((name) => name !== languageName)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.name_surname) {
      errors.name_surname = "Ad və soyad boş buraxıla bilməz";
    }

    if (!formData.birth) {
      errors.birth = "Doğum tarixi boş buraxıla bilməz";
    }

    if (!formData.email) {
      errors.email = "E-mail ünvan boş buraxıla bilməz";
    }

    if (!formData.wp_phone) {
      errors.wp_phone = "Telefon  nömrəsi boş buraxıla bilməz";
    }

    if (!formData.linkedin) {
      errors.linkedin = "Linkedin hesabı boş buraxıla bilməz";
    }

    if (!formData.series) {
      errors.series =
        "Şəxsiyyət vəsiqəsinin seriya nömrəsi boş buraxıla bilməz";
    }

    if (!formData.education) {
      errors.education = "Təhsil səviyyəsi boş buraxıla bilməz";
    }

    if (!formData.experience) {
      errors.experience =
        "Oyun dizaynı sahəsindəki təcrübəniz boş buraxıla bilməz";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = {};

    formObject["language"] = selectedLanguages;

    formData.forEach((value, key) => {
      formObject[key] = value.trim();
    });

    if (isChecked && otherSkill.trim().length > 0 && !otherSubmit) {
      selectedLanguages.push(otherSkill);
      setOtherSubmit(true);
    }

    if (selectedLanguages.length === 0) {
      setLanguageValid({
        ...languageValid,
        language: "Dil bacarıqlarınız mütləqdir.",
      });
    } else {
      setLanguageValid({ ...languageValid, language: null });
    }

    const formErrors = validateForm(formObject);

    if (Object.keys(formErrors).length > 0) {
      setIsValid(formErrors);
      return;
    }

    for (const key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        if (formObject[key] === "" || formObject[key] === null) {
          formObject[key] = null;
        }
      }
    }

    try {
      const response = await axios.post("/game-design-appeal", formObject);
      setFormSubmitted(true);
      if (typeof onFormSubmit === "function") {
        onFormSubmit();
      }
    } catch (error) {
      setIsValid(error.response.data.data);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <h3 className="form-over">Qeydiyyat başa çatmışdır</h3>
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
          //   {/* name surname */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="name_surname">
          //       Ad, Soyad<span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="name_surname"
          //       name="name_surname"
          //       className={`input-row ${isValid?.name_surname ? 'err' : ''}`}
          //     />
          //     {isValid?.name_surname && (
          //       <span className="valid-msg">{...isValid?.name_surname}</span>
          //     )}
          //   </div>

          //   {/* birth */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="birth">
          //       Doğum tarixi
          //       <span className="star">*</span>
          //     </label>
          //     <input
          //       type="date"
          //       id="birth"
          //       name="birth"
          //       className={`input-row ${isValid?.birth ? 'err' : ''}`}
          //     />
          //     {isValid?.birth && (
          //       <span className="valid-msg">{...isValid?.birth}</span>
          //     )}
          //   </div>

          //   {/* email */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="email">
          //       Email
          //       <span className="star">*</span>
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

          //   {/* phone number */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="wp_phone">
          //       Telefon nömrəsi
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

          //   {/* linkedin */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="linkedin">
          //       Linkedin
          //       <span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="linkedin"
          //       name="linkedin"
          //       className={`input-row ${isValid?.linkedin ? 'err' : ''}`}
          //     />
          //     {isValid?.linkedin && (
          //       <span className="valid-msg">{...isValid?.linkedin}</span>
          //     )}
          //   </div>

          //   {/* passport info */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="series">
          //       Şəxsiyyət vəsiqəsinin seriya nömrəsi
          //       <span className="star">*</span>
          //     </label>
          //     <input
          //       type="text"
          //       id="series"
          //       name="series"
          //       className={`input-row ${isValid?.series ? 'err' : ''}`}
          //     />
          //     {isValid?.series && (
          //       <span className="valid-msg">{...isValid?.series}</span>
          //     )}
          //   </div>

          //   {/* education level */}
          //   <div className="radio-field radio-music">
          //     <p className="radio-field__head">
          //       Təhsil səviyyəsi
          //       <span className="star">*</span>
          //     </p>
          //     {eduLevels.map((eduLevel) => {
          //       return (
          //         <div key={eduLevel.id} className="radio-area">
          //           <input
          //             type="radio"
          //             id={`eduLevel_${eduLevel.id}`}
          //             name="education"
          //             value={eduLevel.id}
          //           />
          //           <label
          //             htmlFor={`eduLevel_${eduLevel.id}`}
          //             className="radio-label">
          //             {eduLevel.name}
          //           </label>
          //         </div>
          //       )
          //     })}
          //     {isValid?.education && (
          //       <span className="valid-msg">{...isValid?.education}</span>
          //     )}
          //   </div>

          //   {/* university */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="university">
          //       Təhsil aldığınız universitet
          //     </label>
          //     <input
          //       type="text"
          //       id="university"
          //       name="university"
          //       className={`input-row`}
          //     />
          //   </div>

          //   {/* animation experience */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="experience">
          //       Daha əvvəl oyun dizaynı sahəsində təcrübəniz olubmu?
          //       <span className="star">*</span>
          //       <br />
          //       <span>
          //         <b>Qeyd: </b>Oyun dizaynı dedikdə, 2D/3D konsept art və qrafik
          //         dizayn nəzərdə tutulmur.{' '}
          //       </span>
          //     </label>
          //     <input
          //       type="text"
          //       id="experience"
          //       name="experience"
          //       className={`input-row ${isValid?.experience ? 'err' : ''}`}
          //     />
          //     {isValid?.experience && (
          //       <span className="valid-msg">{...isValid?.experience}</span>
          //     )}
          //   </div>

          //   {/* portfolio link */}
          //   <div className="input-field">
          //     <label className="inp-label" htmlFor="portfolio">
          //       Portfolio linki (varsa)
          //     </label>
          //     <input
          //       type="text"
          //       id="portfolio"
          //       name="portfolio"
          //       className={`input-row`}
          //     />
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
          //         <span className="valid-msg">
          //           {...languageValid?.language}
          //         </span>
          //       )}
          //     </div>
          //   </div>

          //   {/* btn */}
          //   <div className="btn-field">
          //     <button type="submit" className="form-btn">
          //       <span className="form-btn__text">Göndər</span>
          //     </button>
          //   </div>
          // </form>
        }
      </div>
    </>
  );
};

export default GameDesign;
