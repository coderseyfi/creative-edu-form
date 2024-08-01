import React from "react";
import { useState } from "react";
import { eduLevels } from "../../../constants/constant";
import Submit from "../../../assets/ico/submit.svg";
import {
  Button,
  Input,
  Select,
  Form,
  DatePicker,
  ConfigProvider,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import azAZ from "antd/es/locale/az_AZ";
import dayjs from "dayjs";
import "dayjs/locale/az";
dayjs.locale("az");

const Child = ({ onFormSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [eduLevel, setEduLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const handleLevelChange = (value) => {
    console.log(value);
    setEduLevel(value);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  const reset = () => {
    form.resetFields();
  };

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
                      name="name"
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
                      name="surname"
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
                        name="dob"
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
                          message: "Əlaqə telefon nömrəsi boş buraxıla bilməz!",
                        },
                        {
                          pattern: /^[0-9+()/" "-]+$/,
                          message:
                            "Əlaqə telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır!",
                        },
                      ]}
                      label="Əlaqə Telefonu"
                      validateTrigger="onChange"
                      name="phone"
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
                      name="eduLevel"
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

                  {eduLevel === 1 && (
                    <>
                      <h3 className="section-title">Sənədlər</h3>
                      <h4 className="level-cap">Bakalavriat səviyyəsi üzrə:</h4>
                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin cari tədris ilində ümumtəhsil
                          müəssisələrinin buraxılış sinfində (XI sinif və ya
                          xaricdə təhsil aldıqda müvafiq buraxılış sinfi) təhsil
                          almasını təsdiq edən arayış və ya tam orta təhsil və
                          ya orta ixtisas təhsili haqqında dövlət sənədinin
                          surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin xarici ali təhsil müəssisəsinə qəbul
                          edildiyini və ya xarici ali təhsil müəssisəsində
                          təhsil aldığını təsdiq edən sənədin (ingilis, rus və
                          türk dillərindən başqa digər dillərdə olan sənədlərin
                          notariat qaydasında təsdiq edilmiş Azərbaycan dilinə
                          tərcüməsi) surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin təhsil alacağı xarici ali təhsil
                          müəssisəsinin tədris dilini bilməsinə dair beynəlxalq
                          səviyyəli dil sertifikatının surəti və ya öncəki
                          təhsilini təhsil alacağı xarici dildə almasını təsdiq
                          edən sənədin surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin beynəlxalq təhsil proqramları üzrə müəyyən
                          edilmiş keçid ballarının minimum və maksimum hədləri
                          aralığında (minimum və maksimum bal daxil olmaqla)
                          göstəricisini təsdiq edən müvafiq təhsil
                          müəssisəsindən arayışın surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin sağlamlığı haqqında arayış (forma AZS086/1)"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </>
                  )}

                  {eduLevel === 2 && (
                    <>
                      <h3 className="section-title">Sənədlər</h3>
                      <h4 className="level-cap">
                        Magistratura səviyyəsi üzrə:
                      </h4>
                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin cari tədris ilində ali təhsil müəssisəsinin
                          sonuncu tədris ilində təhsil almasını təsdiq edən
                          arayış və ya bakalavr ali peşə-ixtisas dərəcəsi
                          haqqında dövlət sənədinin surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin xarici ali təhsil müəssisəsinə qəbul
                          edildiyini və ya xarici ali təhsil müəssisəsində
                          təhsil aldığını təsdiq edən sənədin (ingilis, rus və
                          türk dillərindən başqa digər dillərdə olan sənədlərin
                          notariat qaydasında təsdiq edilmiş Azərbaycan dilinə
                          tərcüməsi) surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Bakalavriat səviyyəsi üzrə xarici ali təhsilə aid
                          kvalifikasiyanın tanınmasına dair şəhadətnamənin
                          (xaricdə ali təhsil aldıqda) surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin xarici ali təhsil müəssisəsində təhsil alma
                          bacarıqları barədə rəyi özündə ehtiva edən ali təhsil
                          müəssisəsi və ya elmi müəssisə və təşkilatda çalışan
                          professor-müəllim heyətinin ən azı 2 (iki) üzvü
                          tərəfindən verilmiş tövsiyə məktubunun (namizəd əmək
                          fəaliyyəti ilə məşğul olduğu halda, məktublardan biri
                          onun işəgötürəni tərəfindən təqdim edilə bilər) əsli
                          və ya surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin təhsil alacağı xarici ali təhsil
                          müəssisəsinin tədris dilini bilməsinə dair beynəlxalq
                          səviyyəli dil sertifikatının surəti və ya öncəki
                          təhsilini təhsil alacağı xarici dildə almasını təsdiq
                          edən sənədin surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin transkriptinin (ÜOMG göstərilməklə) surəti"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Ad boş buraxıla bilməz!",
                            },
                          ]}
                          label="Namizədin sağlamlığı haqqında arayış (forma AZS-086/1)"
                          validateTrigger="onChange"
                          name="name"
                        >
                          <Upload listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Əlavə et</Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </>
                  )}

                  {eduLevel === 1 && (
                    <>
                      <h3 className="section-title">
                        Müəssisə və ixtisas/proqram seçimi:
                      </h3>
                      <h4 className="level-cap">Bakalavriat səviyyəsi üzrə:</h4>
                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ölkə"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
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

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ali təhsil müəssisəsi"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                          >
                            <Select.Option disabled>
                              Ali təhsil müəssisəsi seçin
                            </Select.Option>
                            {eduLevels.map((level) => (
                              <Select.Option key={level.id} value={level.id}>
                                {level.name}
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
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="İxtisas/proqram"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                          >
                            <Select.Option disabled>
                              İxtisas/proqram seçin
                            </Select.Option>
                            {eduLevels.map((level) => (
                              <Select.Option key={level.id} value={level.id}>
                                {level.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </>
                  )}

                  {/* MASTER */}
                  {eduLevel === 2 && (
                    <>
                      <h3 className="section-title">
                        Müəssisə və ixtisas/proqram seçimi:
                      </h3>
                      <h4 className="level-cap">Bakalavriat səviyyəsi üzrə:</h4>
                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ölkə"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
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

                      <div className="form-item">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="Ali təhsil müəssisəsi"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                          >
                            <Select.Option disabled>
                              Ali təhsil müəssisəsi seçin
                            </Select.Option>
                            {eduLevels.map((level) => (
                              <Select.Option key={level.id} value={level.id}>
                                {level.name}
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
                              message: "Təhsil səviyyəsi boş buraxıla bilməz!",
                            },
                          ]}
                          label="İxtisas/proqram"
                          validateTrigger="onChange"
                          name="eduLevel"
                        >
                          <Select
                            size="large"
                            placeholder="Təhsil səviyyəsini seçin"
                            allowClear
                          >
                            <Select.Option disabled>
                              İxtisas/proqram seçin
                            </Select.Option>
                            {eduLevels.map((level) => (
                              <Select.Option key={level.id} value={level.id}>
                                {level.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </>
                  )}

                  <div className="form-footer">
                    <Button
                      htmlType="submit"
                      className="btn btn-save"
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Child;
