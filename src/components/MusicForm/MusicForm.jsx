import React from "react";
import axios from "../../api/api";
import { useState } from "react";
import Submit from "../../assets/ico/submit.svg";
import Spinner from "../Spinner/Spinner";
import "../form.scss";

const MusicForm = ({ onFormSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isValid, setIsValid] = useState();
  const [loading, setLoading] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [education, setEducation] = useState("");
  const [educationList, setEducationList] = useState([]);

  const handleCheckboxChange = () => {
    setPermissionChecked(!permissionChecked);
    setIsValid({ ...isValid, permission: null });
  };

  const deleteEducation = (index) => {
    const updatedEducationList = educationList.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setEducationList(updatedEducationList);
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Ad, Soyad boş buraxıla bilməz";
    }

    if (!formData.birth_date) {
      errors.birth_date = "⁠Doğum tarixi boş buraxıla bilməz";
    }

    if (!formData.education_level) {
      errors.education_level = "⁠Təhsil səviyyəsi boş buraxıla bilməz";
    }

    if (educationList.length === 0) {
      errors.educational_institution = "Təhsil müəssisəsini əlavə edin";
    }

    if (!formData.phone) {
      errors.phone = "Telefon nömrəsi boş buraxıla bilməz";
    }

    // if (!formData.video_url) {
    //   errors.video_url = "Video keçid linki boş buraxıla bilməz";
    // }

    if (formData.phone.length > 15) {
      errors.phone = "Telefon nömrəsi maksimum 15 simvoldan ibarət ola bilər ";
    }

    if (!formData.serial_number) {
      errors.serial_number =
        "Şəxsiyyət vəsiqəsinin seriya və nömrəsi boş buraxıla bilməz";
    }

    if (!formData.email) {
      errors.email = "Email boş buraxıla bilməz";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value.trim();
    });

    const formErrors = validateForm(formObject);

    formObject["educational_institution"] = educationList;

    if (Object.keys(formErrors).length > 0) {
      setIsValid(formErrors);
      return;
    }

    if (!permissionChecked) {
      setIsValid({
        permission: "Qeydiyyatı tamamlamaq üçün şərtlə razılaşın",
      });
      setFormSubmitted(false);
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
      setLoading(true);
      const response = await axios.post("/song-appeal", formObject);
      setFormSubmitted(true);

      if (typeof onFormSubmit === "function") {
        onFormSubmit();
      }
    } catch (error) {
      setIsValid(error.response.data.data);
      setFormSubmitted(false);
      console.error("Form submit olunmadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEducation = () => {
    const errors = {};
    if (educationList.length == 5) {
      errors.educational_institution =
        "Maksimum 5 təhsil müəssəsi əlavə etmək olar ";
    }
    if (!education.trim().length) {
      errors.educational_institution = "Boş əlavə edilə bilməz";
    }
    if (Object.keys(errors).length > 0) {
      setIsValid(errors);
      return;
    }

    setEducationList([...educationList, education]);
    setEducation("");
  };

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
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label className="inp-label" htmlFor="name">
              Ad, Soyad:
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`input-row ${isValid?.name ? "err" : ""}`}
            />
            {isValid?.name && (
              <span className="valid-msg">{...isValid?.name}</span>
            )}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="birth_date">
              Doğum tarixi:
              {/* <span className="star">*</span> */}
            </label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              className={`input-row ${isValid?.birth_date ? "err" : ""}`}
            />
            {/* {isValid?.company && (
              <span className="valid-msg">{...isValid?.company}</span>
            )} */}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="email">
              E-mail:
              <span className="star">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input-row ${isValid?.email ? "err" : ""}`}
            />
            {isValid?.email && (
              <span className="valid-msg">{...isValid?.email}</span>
            )}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="phone">
              Telefon nömrəsi:
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`input-row ${isValid?.phone ? "err" : ""}`}
            />
            {isValid?.phone && (
              <span className="valid-msg">{...isValid?.phone}</span>
            )}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="serial_number">
              Şəxsiyyət vəsiqəsinin seriya və nömrəsi:
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              className={`input-row ${isValid?.serial_number ? "err" : ""}`}
            />
            {isValid?.serial_number && (
              <span className="valid-msg">{...isValid?.serial_number}</span>
            )}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="education_level">
              Təhsil səviyyəsi:
              <span className="star">*</span>
            </label>
            <input
              type="text"
              id="education_level"
              name="education_level"
              className={`input-row ${isValid?.education_level ? "err" : ""}`}
            />
            {isValid?.education_level && (
              <span className="valid-msg">{...isValid?.education_level}</span>
            )}
          </div>

          <div className="input-field">
            <label className="inp-label" htmlFor="educational_institution">
              Təhsil müəssisəsi:
              <span className="star">*</span>
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: 12,
              }}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  id="educational_institution"
                  name="educational_institution"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  style={{ width: "100%", paddingRight: "120px" }}
                  className={`input-row ${
                    isValid?.educational_institution ? "err" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={addEducation}
                  className="add-edu"
                  style={{
                    position: "absolute",
                    right: 10,
                    width: 100,
                    height: 40,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#f3f7ff",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  Əlavə et
                </button>
              </div>
              <div
                className="education_tags"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  padding: educationList.length > 0 ? "15px 30px" : "0px 30px",
                  maxHeight: educationList.length > 0 ? "100vh" : 0,
                  transition: ".2s linear",
                  overflow: "hidden",
                  borderRadius: 8,
                }}
              >
                {educationList.map((educationItem, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#ddd",
                        padding: "3px 7px",
                        borderRadius: 4,
                        paddingRight: 24,
                        position: "relative",
                      }}
                    >
                      {educationItem}

                      <button
                        onClick={() => deleteEducation(index)}
                        type="button"
                        style={{
                          position: "absolute",
                          right: "5px",
                          color: "red",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          fontSize: 15,
                        }}
                      >
                        &#10005;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {isValid?.educational_institution && (
              <span className="valid-msg">
                {...isValid?.educational_institution}
              </span>
            )}
          </div>

          {/* <div className="input-field">
            <label className="inp-label" htmlFor="video_url">
              ⁠Video keçid linki:
              <span className="star">*</span>
              <p className="txt-f">
                2 canlı ifanızdan ibarət videonuzun linkini buraya yerləşdirin.
                Videolar həvəskar formatda, smartfona belə çəkilə bilər. Əsas
                meyar səsinizin aydın eşidilməyidir.
              </p>
              <p className="txt-f">
                <i>Qeyd:</i> Videoları “Wetransfer”, “Google Drive”, “Dropbox”
                və bu tipli platformalara yükləyib, linki bu qeydiyyat formasına
                yükləməyiniz xahiş olunur.
              </p>
            </label>
            <textarea
              type="text"
              id="video_url"
              name="video_url"
              className={`input-row ${isValid?.video_url ? "err" : ""}`}
            />
            {isValid?.video_url && (
              <span className="valid-msg">{...isValid?.video_url}</span>
            )}
          </div> */}

          <div className="checkbox-row">
            <label htmlFor="permission" className="checkbox-container">
              Fərdi məlumatlarımın "Fərdi məlumatlar haqqında" Azərbaycan
              Respublikasının Qanununa və digər normativ hüquqi aktların
              tələblərinə uyğun olaraq, Azərbaycan Respublikasının Mədəniyyət
              Nazirliyinə ötürülməsinə, habelə Azərbaycan Respublikasının
              Mədəniyyət Nazirliyi tərəfindən istifadəsinə razılıq verirəm.
              <input
                checked={permissionChecked}
                onChange={handleCheckboxChange}
                id="permission"
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
            {isValid?.permission && (
              <span className="valid-msg">{isValid?.permission}</span>
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
  );
};

export default MusicForm;
