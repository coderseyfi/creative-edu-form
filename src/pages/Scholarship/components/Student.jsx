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
  Checkbox,
} from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import azAZ from "antd/es/locale/az_AZ";
import dayjs from "dayjs";
import "dayjs/locale/az";
import instance from "../../../api/api";
import Swal from "sweetalert2";
import filePdf from "../../../assets/files/file.pdf";
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
  const [programId, setProgramId] = useState(null);

  const [editingCountry, setEditingCountry] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState(false);
  const [editingProgram, setEditingProgram] = useState(false);

  const [countryInput, setCountryInput] = useState("");
  const [institutionInput, setInstitutionInput] = useState("");
  const [programInput, setProgramInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);

  const [able, setAble] = useState(false);

  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const currentItems =
    items.find((item) => item.level === eduLevel)?.steps || [];

  console.log("UPLOADED FILES", uploadedFiles);

  const getUploadProps = (itemId) => ({
    name: "file",
    action: "https://backendedu.creative.az/api/upload/files",
    onChange(info) {
      if (info.file.status === "done") {
        const fileInfo = info.file.response;
        const newFile = {
          file_uuid: fileInfo.id,
          file_path: fileInfo.storage_path,
          type: itemId,
        };

        const updatedFiles = [...uploadedFiles];
        updatedFiles[itemId - 1] = { ...newFile };

        setUploadedFiles(updatedFiles);
        message.success(`${info.file.name} file uploaded successfully`);

        currentItems.map((item) => {
          if (item.id === itemId) {
            console.log(item.id + 1);

            setActiveIndex(item.id + 1);
          }
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    defaultFileList: uploadedFiles.filter((file) => file.itemId === itemId),
  });

  const getMultipleUploadProps = () => ({
    name: "file",
    action: "https://backendedu.creative.az/api/upload/files",
    onChange(info) {
      if (info.file.status === "done") {
        const fileInfo = info.file.response;
        const newFile = {
          uid: info.file.uid,
          file_uuid: fileInfo.id,
          file_path: fileInfo.storage_path,
          type: 0,
        };

        setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    defaultFileList: uploadedFiles.filter((file) => file.itemId === undefined),
    onRemove(file) {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((uploadedFile) => uploadedFile.uid !== file.uid)
      );
      message.success(`${file.name} file removed successfully`);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    const filteredFiles = uploadedFiles.map(
      ({ file_uuid, file_path, type }) => ({
        file_uuid,
        file_path,
        type,
      })
    );

    const formData = {
      ...data,
      birth_date: dayjs(data.birth_date).format("YYYY-MM-DD"),
      files: filteredFiles,
    };

    console.log(formData);

    try {
      await instance.post("/scholarship-programs-appeal", formData);
      console.log("Form submitted successfully");
      setFormSubmitted(true);
      message.success("Müraciət uğurla göndərildi");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Xəta!",
        html: Object.entries(error.response.data.data)
          .map(([key, value]) => `<p>${value}</p>`)
          .join(""),
        icon: "error",
        confirmButtonText: "Bağla",
      });
      setFormSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (value) => {
    setEduLevel(value);
    setAble(true);
  };

  const handleAgeRangeChange = (e) => {
    const value = e.target.value;
    setAgeRange(value);
    setShowForm(true);

    if (value === "0") {
      form.resetFields([
        "parent_first_name",
        "parent_last_name",
        "parent_type",
        "parent_contact_phone",
        "parent_email",
      ]);
    }
  };

  const handleCountryChange = (value) => {
    if (value === "") {
      setEditingCountry(true);
      setCountryId(null);
      setInstitutions([]);
      setPrograms([]);
    } else {
      setCountryId(value);
      setEditingCountry(false);
      setInstitutions([]);
      setPrograms([]);
    }
  };

  const handleInstitutionChange = (value) => {
    if (value === "") {
      setEditingInstitution(true);
      setInstitutionId(null);
      setPrograms([]);
    } else {
      setInstitutionId(value);
      setEditingInstitution(false);
      setPrograms([]);
    }
  };

  const handleProgramChange = (value) => {
    if (value === "") {
      setEditingProgram(true);
      setProgramId(null);
    } else {
      setProgramId(value);
      setEditingProgram(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await instance.get(
          "/scholarship-programs-appeal/select-list/countries"
        );
        setCountries(response.data.data);
      } catch (error) {
        console.log("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchInstitutions = async (selectedCountryId) => {
      if (typeof selectedCountryId === "number") {
        // Check if countryId is a number
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
      }
    };

    if (typeof countryId === "number") {
      fetchInstitutions(countryId);
    }
  }, [countryId]);

  useEffect(() => {
    const fetchPrograms = async (selectedInstitutionId) => {
      if (typeof selectedInstitutionId === "number") {
        try {
          const response = await instance.get(
            "/scholarship-programs-appeal/select-list/programs",
            {
              params: {
                institution_id: selectedInstitutionId,
                education_level_id: eduLevel,
              },
            }
          );
          setPrograms(response.data.data);
        } catch (error) {
          message.error("Error fetching programs");
        }
      }
    };

    if (typeof institutionId === "number") {
      fetchPrograms(institutionId);
    }
  }, [institutionId, eduLevel]);

  return (
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
                  <Radio.Button value="1">15 -18 yaşı arası</Radio.Button>
                  <Radio.Button value="0">18 yaşdan yuxarı</Radio.Button>
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
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Ata adı boş buraxıla bilməz!",
                      },
                    ]}
                    label="Ata adı"
                    validateTrigger="onChange"
                    name="father_name"
                  >
                    <Input size="large" placeholder="Ata adı daxil edin" />
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
                      {
                        len: 7,
                        message: "FİN yalnızca 7 simvoldan ibarət olmalıdır!",
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
                        message: "Əlaqə telefon nömrəsi boş buraxıla bilməz!",
                      },
                      {
                        pattern: /^[0-9+()/" "-]+$/,
                        message:
                          "Əlaqə telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır!",
                      },
                      {
                        max: 20,
                        message:
                          "Əlaqə telefon maksimum 20 simvoldan ibarət ola bilər!",
                      },
                      {
                        min: 9,
                        message:
                          "Əlaqə telefon minimum 9 simvoldan ibarət ola bilər!",
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
                        message: "Düzgün elektron poçt ünvanı daxil edin!",
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
                  <h4 className="level-cap">
                    {eduLevel == 1
                      ? "Bakalavriat səviyyəsi üzrə:"
                      : "Magistratura səviyyəsi üzrə:"}
                  </h4>
                )}

                <h3 className="section-title">
                  Müəssisə və ixtisas/proqram seçimi:
                </h3>

                <div className={`form-item ${eduLevel ? "" : "disabled"}`}>
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
                    {editingCountry ? (
                      <Input
                        value={countryInput}
                        onChange={(e) => setCountryInput(e.target.value)}
                        placeholder="Ölkə adı daxil edin"
                        onBlur={() => {
                          setCountryId(countryInput);
                          setEditingCountry(false);
                        }}
                      />
                    ) : (
                      <Select
                        size="large"
                        placeholder="Ölkə seçin"
                        allowClear
                        onChange={handleCountryChange}
                        value={countryId}
                        disabled={!eduLevel}
                      >
                        {countries.map((country) => (
                          <Option key={country.id} value={country.id}>
                            {country.name}
                          </Option>
                        ))}
                        <Option value="">Digər</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>

                <div className={`form-item ${countryId ? "" : "disabled"}`}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Ali təhsil səviyyəsi boş buraxıla bilməz!",
                      },
                    ]}
                    label="Ali təhsil müəssisəsi"
                    validateTrigger="onChange"
                    name="educational_institution_id"
                  >
                    {editingInstitution ? (
                      <Input
                        value={institutionInput}
                        onChange={(e) => setInstitutionInput(e.target.value)}
                        placeholder="Ali təhsil səviyyəsi daxil edin"
                        onBlur={() => {
                          setInstitutionId(institutionInput);
                          setEditingInstitution(false);
                        }}
                      />
                    ) : (
                      <Select
                        size="large"
                        placeholder="Ali təhsil müəssisəsi seçin"
                        allowClear
                        onChange={handleInstitutionChange}
                        value={institutionId}
                        disabled={!countryId} // Disable if no country is selected
                      >
                        {institutions.map((institution) => (
                          <Option key={institution.id} value={institution.id}>
                            {institution.name}
                          </Option>
                        ))}
                        <Option value="">Digər</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>

                <div className={`form-item ${institutionId ? "" : "disabled"}`}>
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
                    {editingProgram ? (
                      <Input
                        value={programInput}
                        onChange={(e) => setProgramInput(e.target.value)}
                        placeholder="Proqram daxil edin"
                        onBlur={() => {
                          setProgramId(programInput);
                          setEditingProgram(false);
                        }}
                      />
                    ) : (
                      <Select
                        size="large"
                        placeholder="Proqram seçin"
                        allowClear
                        onChange={handleProgramChange}
                        value={programId}
                        disabled={!institutionId}
                      >
                        {programs.map((program) => (
                          <Option key={program.id} value={program.id}>
                            {program.name}
                          </Option>
                        ))}
                        <Option value="">Digər</Option>
                      </Select>
                    )}
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
                      <div
                        key={index}
                        className={`form-item ${
                          item.id <= activeIndex ? "" : "disabled"
                        }`}
                      >
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Fayl əlavə edilməlidir!",
                            },
                          ]}
                          label={item.label}
                          validateTrigger="onChange"
                        >
                          <Upload
                            {...getUploadProps(item.id)}
                            listType="picture"
                            maxCount={1}
                          >
                            <Button icon={<UploadOutlined />}>
                              Əlavə edin
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    ))}
                  </div>
                )}

                {eduLevel && (
                  <div>
                    <div className={`form-item`}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Fayl əlavə edilməlidir!",
                          },
                        ]}
                        label={
                          "Namizədin özünün ərsəyə gətirdiyi MYS məhsulu olduğu halda foto və video materiallar, sahibkarlıq (o cümlədən startap) fəaliyyəti ilə məşğul olduğu halda, VÖEN, startap şəhadətnaməsi (olduğu halda) və digər təsdiqedici materiallar"
                        }
                        validateTrigger="onChange"
                      >
                        <Upload
                          {...getMultipleUploadProps()}
                          listType="picture"
                          multiple
                          maxCount={Infinity}
                        >
                          <Button icon={<UploadOutlined />}>
                            Faylları əlavə edin
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  </div>
                )}

                {ageRange === "1" && (
                  <>
                    <h3 className="section-title">Valideyn məlumatları:</h3>
                    <div className="form-item">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Valideynin adı boş buraxıla bilməz!",
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
                            message: "Valideynin soaydı boş buraxıla bilməz!",
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
                            message:
                              "Əlaqə telefon nömrəsi boş buraxıla bilməz!",
                          },
                          {
                            pattern: /^[0-9+()/" "-]+$/,
                            message:
                              "Əlaqə telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır!",
                          },
                          {
                            max: 20,
                            message:
                              "Əlaqə telefon maksimum 20 simvoldan ibarət ola bilər!",
                          },
                          {
                            min: 9,
                            message:
                              "Əlaqə telefon minimum 9 simvoldan ibarət ola bilər!",
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

                    <div className="form-item ">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message:
                              "Valideynin elektron poçtu boş buraxıla bilməz!",
                          },
                          {
                            type: "email",
                            message: "Düzgün elektron poçt ünvanı daxil edin!",
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

                    <div className="form-item rule-parent">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Qanuni nümayəndə boş buraxıla bilməz!",
                          },
                        ]}
                        label="Qanuni nümayəndə:"
                        name="parent_type"
                      >
                        <Radio.Group>
                          {parentOrNot.map((item) => (
                            <Radio value={item.id}>{item.name}</Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </>
                )}

                <div className="form-item rule-area">
                  <a className="rule-word" target="_blank" href={filePdf}>
                    <div className="info">
                      Qaydalar və şərtlər
                      <InfoCircleOutlined />
                    </div>
                  </a>
                  <Form.Item
                    name="termsAgreement"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message:
                          "Qaydalar və şərtləri oxuyub razı olmalısınız!",
                      },
                    ]}
                  >
                    <Checkbox>Oxudum və razıyam</Checkbox>
                  </Form.Item>
                </div>

                <div className="form-item condition">
                  <Form.Item
                    name="dataConsent"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message:
                          "Fərdi məlumatlar üçün razılığınızı bildirməlisiniz!",
                      },
                    ]}
                  >
                    <Checkbox>
                      Fərdi məlumatlarımın "Fərdi məlumatlar haqqında"
                      Azərbaycan Respublikasının Qanununa və digər normativ
                      hüquqi aktların tələblərinə uyğun olaraq, Azərbaycan
                      Respublikasının Mədəniyyət Nazirliyinə ötürülməsinə,
                      habelə Azərbaycan Respublikasının Mədəniyyət Nazirliyi
                      tərəfindən istifadəsinə razılıq verirəm.
                    </Checkbox>
                  </Form.Item>
                </div>

                <div className="form-footer">
                  <Button loading={loading} type="primary" htmlType="submit">
                    Göndər
                  </Button>
                </div>
              </>
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

export default Student;
