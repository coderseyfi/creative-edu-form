import React from "react";
import axios from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import Submit from "../../assets/ico/submit.svg";
import "./comedyform.scss";
import { languages } from "../../constants/constant";

const experiences = [
  {
    id: 1,
    name: "Bəli",
  },
  {
    id: 2,
    name: "Xeyr",
  },
];

const ages = [
  {
    id: 1,
    age: "15-19",
  },
  {
    id: 2,
    age: "20-25",
  },
  {
    id: 3,
    age: "26-35",
  },
  {
    id: 4,
    age: "36-50",
  },
  {
    id: 5,
    age: "50+",
  },
];

const ComedyForm = ({ onFormSubmit }) => {
  const [activities, setActivities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isValid, setIsValid] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/comedy/activities");
      setActivities(data.data);

      const genreInfos = await axios.get("/comedy/genres");
      setGenres(genreInfos.data.data);
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value.trim();
    });

    if (otherSkill.trim().length > 0) {
      if (isChecked) {
        selectedSkills.push(otherSkill);
      }
    }

    for (const key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        if (formObject[key] === "" || formObject[key] === null) {
          formObject[key] = null;
        }
      }
    }

    try {
      const response = await axios.post("/comedy-appeal", formObject);
      setFormSubmitted(true);
      console.log("Form submit oldu!", response.data);
      if (typeof onFormSubmit === "function") {
        onFormSubmit();
      }
    } catch (error) {
      setIsValid(error.response.data.data);
      setFormSubmitted(false);
      console.error("Form submit olunmadı:", error);
    }
  };

  return (
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
        //       Ad və Soyad<span className="star">*</span>
        //     </label>
        //     <input
        //       type="text"
        //       id="email"
        //       name="name_surname"
        //       className={`input-row ${isValid?.name_surname ? "err" : ""}`}
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
        //       className={`input-row ${isValid?.wp_phone ? "err" : ""}`}
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
        //       className={`input-row ${isValid?.email ? "err" : ""}`}
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
        //       );
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
        //             className="radio-label"
        //           >
        //             {activity.name}
        //           </label>
        //         </div>
        //       );
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
        //             className="radio-label"
        //           >
        //             {experience.name}
        //           </label>
        //         </div>
        //       );
        //     })}
        //     {isValid?.have_experience && (
        //       <span className="valid-msg">{...isValid?.have_experience}</span>
        //     )}
        //   </div>
        //   <div className="radio-field radio-music">
        //     <p className="radio-field__head">
        //       Hansı komediya janrını öyrənmək istərdiniz? *
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
        //       );
        //     })}
        //     {isValid?.learn_genre && (
        //       <span className="valid-msg">{...isValid?.learn_genre}</span>
        //     )}
        //   </div>
        //   <div className="checkbox-field">
        //     <p>
        //       Dil bacarıqlarınız <span className="star">*</span>
        //     </p>
        //     <div className="checkbox-wrapper">
        //       {languages.map((language) => {
        //         return (
        //           <div className="checkbox-area">
        //             <input
        //               type="checkbox"
        //               id={`skill_${language.id}`}
        //               onChange={() => handleInput(language.id)}
        //             />
        //             <label htmlFor={`skill_${language.id}`}>
        //               {language.name}
        //             </label>
        //           </div>
        //         );
        //       })}
        //       <div className="checkbox-area">
        //         <input
        //           type="checkbox"
        //           id="otherSkill"
        //           className="other-box"
        //           onChange={(e) => {
        //             setIsChecked(e.target.checked);
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
        //       {/* {isValid?.animator_skills && (
        //         <span className="valid-msg">{...isValid?.animator_skills}</span>
        //       )} */}
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
  );
};

export default ComedyForm;
