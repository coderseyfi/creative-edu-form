import React, { useEffect } from "react";
import { useState } from "react";
import { eduLevels, items, parentOrNot } from "../../../constants/constant";
import Submit from "../../../assets/ico/submit.svg";
import {
  Button,
  Input,
  Select,
  Form,
  DatePicker,
  ConfigProvider,
  Upload,
  message,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import azAZ from "antd/es/locale/az_AZ";
import dayjs from "dayjs";
import "dayjs/locale/az";
import instance from "../../../api/api";
dayjs.locale("az");

const Student = ({ onFormSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eduLevel, setEduLevel] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ageRange, setAgeRange] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [institutionId, setInstitutionId] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const props = {
    name: "file",
    action: "https://backendedu.creative.az/api/upload/files",
    onChange(info) {
      if (info.file.status === "done") {
        const fileInfo = info.file.response;
        const newFile = {
          file_uuid: fileInfo.id,
          file_path: fileInfo.storage_path,
          type: uploadedFiles.length + 1,
        };
        setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {
      ...data,
      files: uploadedFiles,
    };

    console.log(formData);

    try {
      await instance.post("/scholarship-programs-appeal", formData);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (value) => {
    console.log(value);
    setEduLevel(value);
  };

  const handleAgeRangeChange = (e) => {
    setAgeRange(e.target.value);
    setShowForm(true);
  };

  const currentItems =
    items.find((item) => item.level === eduLevel)?.steps || [];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await instance.get(
          "/scholarship-programs-appeal/select-list/countries",
          {
            params: {
              education_level_id: eduLevel,
            },
          }
        );
        setCountries(response.data.data);
      } catch (error) {
        console.log("Error fetching countries");
      }
    };

    const fetchInstitutions = async (selectedCountryId) => {
      if (!selectedCountryId) return;

      try {
        const response = await instance.get(
          "/scholarship-programs-appeal/select-list/institutions",
          {
            params: {
              country_id: selectedCountryId,
            },
          }
        );
        console.log("Institutions:", response.data);
        setInstitutions(response.data.data);
      } catch (error) {
        message.error("Error fetching institutions");
      }
    };

    const fetchPrograms = async (selectedInstitutionId) => {
      if (!selectedInstitutionId) return;

      try {
        const response = await instance.get(
          "/scholarship-programs-appeal/select-list/programs",
          {
            params: {
              institution_id: selectedInstitutionId,
            },
          }
        );
        setPrograms(response.data.data);
      } catch (error) {
        message.error("Error fetching programs");
      }
    };

    if (eduLevel) {
      fetchCountries();
    }

    if (countryId) {
      fetchInstitutions(countryId);
    }

    if (institutionId) {
      fetchPrograms(institutionId);
    }
  }, [eduLevel, countryId, institutionId]);

  return (
    <>
      <div className="form-area">
        {formSubmitted ? (
          <div className="form-submit-message">
            <div className="submit-box">
              <img src={Submit} alt="" />
              <p className="success">Müraciətiniz uğurla göndərildi</p>
            </div>
          </div>
        ) : (
          <div className="form-area">
            {formSubmitted ? (
              <div className="form-submit-message">
                <div className="submit-box">
                  <img src={Submit} alt="" />
                  <p className="success">Müraciətiniz uğurla göndərildi</p>
                </div>
              </div>
            ) : (
              <Form
                className="form"
                layout="vertical"
                onFinish={onSubmit}
                form={form}
              >
                <div className="form-row">
                  <div className="form-item first-row">
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Yaş aralığı seçilməlidir!",
                        },
                      ]}
                      name="is_parent"
                    >
                      <Radio.Group onChange={handleAgeRangeChange}>
                        <Radio.Button value="0">
                          18 yaşdan yuxarı namizədlər üçün
                        </Radio.Button>
                        <Radio.Button value="1">
                          Namizədin yaşı 15 -18 yaşı arası olduqda
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  {showForm && (
                    <>
                      <div className="form-item">
                        <Form.Item
                          label="Ad"
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          validateTrigger="onChange"
                          name="first_name"
                        >
                          <Input size="large" placeholder="Ad daxil edin" />
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Soyad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Soyad"
                          validateTrigger="onChange"
                          name="last_name"
                        >
                          <Input size="large" placeholder="Soyad daxil edin" />
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <ConfigProvider locale={azAZ}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Doğum tarixi boş buraxıla bilməz!",
                              },
                            ]}
                            label="Doğum tarixi"
                            validateTrigger="onChange"
                            name="birth_date"
                          >
                            <DatePicker
                              size="large"
                              placeholder="Doğum tarixi seçin"
                              disabledDate={disabledDate}
                              format={dateFormat}
                            />
                          </Form.Item>
                        </ConfigProvider>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "FİN boş buraxıla bilməz!",
                            },
                          ]}
                          label="FİN"
                          validateTrigger="onChange"
                          name="pin"
                        >
                          <Input size="large" placeholder="FİN daxil edin" />
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ünvan boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ünvan"
                          validateTrigger="onChange"
                          name="address"
                        >
                          <Input size="large" placeholder="Ünvan daxil edin" />
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message:
                                "Əlaqə telefon nömrəsi boş buraxıla bilməz!",
                            },
                            {
                              pattern: /^[0-9+()/" "-]+$/,
                              message:
                                "Əlaqə telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır!",
                            },
                          ]}
                          label="Əlaqə Telefonu"
                          validateTrigger="onChange"
                          name="contact_phone"
                        >
                          <Input
                            size="large"
                            placeholder="Əlaqə telefon nömrəsi daxil edin"
                          />
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Elektron poçt boş buraxıla bilməz!",
                            },
                            {
                              type: "email",
                              message:
                                "Düzgün elektron poçt ünvanı daxil edin!",
                            },
                          ]}
                          label="Elektron poçt"
                          validateTrigger="onChange"
                          name="email"
                        >
                          <Input
                            size="large"
                            placeholder="Elektron poçt ünvanı daxil edin"
                          />
                        </Form.Item>
                      </div>

                      {ageRange === "1" && (
                        <>
                          <h3 className="section-title">
                            Valideyn məlumatları:
                          </h3>
                          <div className="form-item">
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Valideynin adı boş buraxıla bilməz!",
                                },
                              ]}
                              label="Ad"
                              name="parent_first_name"
                            >
                              <Input
                                size="large"
                                placeholder="Valideynin adı daxil edin"
                              />
                            </Form.Item>
                          </div>

                          <div className="form-item">
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Valideynin soaydı boş buraxıla bilməz!",
                                },
                              ]}
                              label="Soyad"
                              name="parent_last_name"
                            >
                              <Input
                                size="large"
                                placeholder="Valideynin adı daxil edin"
                              />
                            </Form.Item>
                          </div>

                          <div className="form-item">
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Yaş aralığı seçilməlidir!",
                                },
                              ]}
                              name="parent_type"
                            >
                              <Radio.Group>
                                {parentOrNot.map((item) => (
                                  <Radio value={item.id}>{item.name}</Radio>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          </div>

                          <div className="form-item">
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Əlaqə telefon nömrəsi boş buraxıla bilməz!",
                                },
                                {
                                  pattern: /^[0-9+()/" "-]+$/,
                                  message:
                                    "Əlaqə telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır!",
                                },
                              ]}
                              label="Əlaqə Telefonu"
                              validateTrigger="onChange"
                              name="parent_contact_phone"
                            >
                              <Input
                                size="large"
                                placeholder="Əlaqə telefon nömrəsi daxil edin"
                              />
                            </Form.Item>
                          </div>

                          <div className="form-item">
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Valideynin elektron poçtu boş buraxıla bilməz!",
                                },
                                {
                                  type: "email",
                                  message:
                                    "Düzgün elektron poçt ünvanı daxil edin!",
                                },
                              ]}
                              label="Valideynin elektron poçtu"
                              name="parent_email"
                            >
                              <Input
                                size="large"
                                placeholder="Valideynin elektron poçt ünvanı daxil edin"
                              />
                            </Form.Item>
                          </div>
                        </>
                      )}

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Təqaüd Proqramı üzrə təhsil alacağı səviyyə"
                          validateTrigger="onChange"
                          name="education_level_id"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                            onChange={handleLevelChange}
                          >
                            <Select.Option disabled>
                              Təhsil səviyyəsini seçin
                            </Select.Option>
                            {eduLevels.map((level) => (
                              <Select.Option key={level.id} value={level.id}>
                                {level.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      {eduLevel && (
                        <div>
                          <h3 className="section-title">Sənədlər</h3>
                          <h4 className="level-cap">
                            {eduLevel === 1
                              ? "Bakalavriat səviyyəsi üzrə:"
                              : "Magistratura səviyyəsi üzrə:"}
                          </h4>

                          {currentItems.map((item, index) => (
                            <div key={index} className={`form-item`}>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message: "Ad boş buraxıla bilməz!",
                                  },
                                ]}
                                label={item.label}
                                validateTrigger="onChange"
                              >
                                <Upload
                                  {...props}
                                  listType="picture"
                                  maxCount={1}
                                >
                                  <Button icon={<UploadOutlined />}>
                                    Əlavə et
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </div>
                          ))}

                          <h3 className="section-title">
                            Müəssisə və ixtisas/proqram seçimi:
                          </h3>
                        </div>
                      )}

                      <h4 className="level-cap">
                        {eduLevel == 1
                          ? "Bakalavriat səviyyəsi üzrə:"
                          : "Magistratura səviyyəsi üzrə:"}
                      </h4>
                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ölkə səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ölkə"
                          validateTrigger="onChange"
                          name="country_id"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                            onChange={(value) => {
                              setCountryId(value);
                              setInstitutions([]);
                            }}
                          >
                            <Select.Option disabled>Ölkə seçin</Select.Option>
                            {Array.isArray(countries) &&
                              countries?.map((country) => (
                                <Select.Option
                                  key={country?.id}
                                  value={country?.id}
                                >
                                  {country?.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message:
                                "Ali təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ali təhsil müəssisəsi"
                          validateTrigger="onChange"
                          name="educational_institution_id"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                            onChange={(value) => setInstitutionId(value)}
                          >
                            <Select.Option disabled>
                              Ali təhsil müəssisəsi seçin
                            </Select.Option>
                            {Array.isArray(institutions) &&
                              institutions?.map((institution) => (
                                <Select.Option
                                  key={institution.id}
                                  value={institution.id}
                                >
                                  {institution.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Proqram səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="İxtisas/proqram"
                          validateTrigger="onChange"
                          name="educational_program_id"
                        >
                          <Select
                            size="large"
                            placeholder="Proqram seçin"
                            allowClear
                          >
                            <Select.Option disabled>
                              İxtisas/proqram seçin
                            </Select.Option>
                            {programs?.map((program) => (
                              <Select.Option
                                key={program.id}
                                value={program.id}
                              >
                                {program.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="form-footer">
                        <Button
                          htmlType="submit"
                          className="btn btn-save"
                          loading={loading}
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Student;
