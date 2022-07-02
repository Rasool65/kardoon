import { AddAddressModelSchema, IAddAddressModel } from '@src/models/input/addAddress/IAddAddressModel';
import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, FormFeedback, Input, Row } from 'reactstrap';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';

const AddAddressModal: FunctionComponent<any> = ({ addAddressModalVisible }: any) => {
  const [forMe, setForMe] = useState<Boolean>(true);
  const { t }: any = useTranslation();
  const [input, setInput] = useState<any>({
    title: false,
    zipCode: false, // code posti
    provinceId: false, //ostan
    districtId: false, //mantaghe
    address: false,
    unit: false, //vahed
    number: false, //pelak
    homeTel: false,
    firstName: false,
    lastName: false,
    mobileNumber: false,
    telNumber: false,
  });
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddAddressModel>({ mode: 'onChange', resolver: yupResolver(AddAddressModelSchema) });

  const onSubmit = (data: IAddAddressModel) => {
    debugger;
    // const body: IAddAddressModel = {
    //   serviceTypeId: state.ServiceTypeId,
    //   productCategoryId: state.ProductId,
    //   brandId: data.brandId,
    //   model: data.model,
    //   serial: data.serial,
    //   requestDescription: data.requestDescription,
    //   audioMessage: audioFile,
    //   imageMessage: imageFile,
    //   videoMessage: videoFile,
    // };

    // handleClickNext(body);
  };
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div
      className={`menu menu-box-bottom menu-box-detached rounded-m ${addAddressModalVisible ? 'menu-active' : ''}`}
      data-menu-height="513"
      style={{ display: 'inherit' }}
      data-menu-effect="menu-over"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-4" style={{ marginBottom: '0px' }}>
          <div style={{ height: '388px', overflow: 'scroll' }}>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.title ? 'input-style-active' : ''}`}>
              <Controller
                name="title"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form4a"
                      onFocus={() => setInput({ title: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-text"
                      type="text"
                      placeholder={t('EnterTitle')}
                      autoComplete="off"
                      invalid={errors.title && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('Title')}
                    </label>
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.title ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
                    <em className={`${input.title ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.title?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.zipCode ? 'input-style-active' : ''}`}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form4a"
                      onFocus={() => setInput({ zipCode: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-text"
                      type="text"
                      placeholder={t('EnterZipCode')}
                      autoComplete="off"
                      invalid={errors.zipCode && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('ZipCode')}
                    </label>
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.zipCode ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
                    <em className={`${input.zipCode ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.zipCode?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <div
              className={`input-style has-borders no-icon validate-field mb-4 ${input.provinceId ? 'input-style-active' : ''}`}
            >
              <Controller
                name="provinceId"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      noOptionsMessage={() => t('ListIsEmpty')}
                      onFocus={() => GetProvinceList()}
                      isClearable
                      // theme={(theme) => ({
                      //   ...theme,
                      //   borderRadius: 10,
                      // })}
                      className="select-city"
                      placeholder={t('SelectProvince')}
                      options={provinces}
                      isSearchable={true}
                      {...field}
                    />
                    <FormFeedback className="d-block">{errors.provinceId?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <div
              className={`input-style has-borders no-icon validate-field mb-4 ${input.districtId ? 'input-style-active' : ''}`}
            >
              <Controller
                name="districtId"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      noOptionsMessage={() => t('ListIsEmpty')}
                      onFocus={() => GetDistrictList()}
                      isClearable
                      // theme={(theme) => ({
                      //   ...theme,
                      //   borderRadius: 10,
                      // })}
                      className="select-city"
                      placeholder={t('SelectDistrict')}
                      options={districts}
                      isSearchable={true}
                      {...field}
                    />
                    <FormFeedback className="d-block">{errors.districtId?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.address ? 'input-style-active' : ''}`}>
              <Controller
                name="address"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form4a"
                      onFocus={() => setInput({ address: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-text"
                      type="text"
                      placeholder={t('EnterAddress')}
                      autoComplete="off"
                      invalid={errors.address && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('Address')}
                    </label>
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.address ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
                    <em className={`${input.address ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.address?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.homeTel ? 'input-style-active' : ''}`}>
              <Controller
                name="homeTel"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form4a"
                      onFocus={() => setInput({ homeTel: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-text"
                      type="number"
                      placeholder={t('EnterHomeTell')}
                      autoComplete="off"
                      invalid={errors.homeTel && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('HomeTell')}
                    </label>
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.homeTel ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
                    <em className={`${input.homeTel ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.homeTel?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <Container style={{ maxWidth: '100%', padding: '0 0 0 0' }}>
              <Row
                style={{
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 0 0 0',
                  marginBottom: '0',
                }}
              >
                <Col style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                  <div
                    className={`input-style has-borders no-icon validate-field mb-4 ${input.number ? 'input-style-active' : ''}`}
                  >
                    <Controller
                      name="number"
                      control={control}
                      render={({ field }: any) => (
                        <>
                          <Input
                            id="form4a"
                            onFocus={() => setInput({ number: true })}
                            style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                            className="form-control validate-text"
                            type="text"
                            placeholder={t('EnterNumber')}
                            autoComplete="off"
                            invalid={errors.number && true}
                            {...field}
                          />
                          <label htmlFor="form4" className="color-highlight">
                            {t('Number')}
                          </label>
                          <i className={`fa fa-times disabled invalid color-red-dark ${input.number ? 'disabled' : ''}`} />
                          <i className="fa fa-check disabled valid color-green-dark" />
                          <em className={`${input.number ? 'disabled' : ''}`}>({t('Required')})</em>
                          <FormFeedback>{errors.number?.message}</FormFeedback>
                        </>
                      )}
                    />
                  </div>
                </Col>
                <Col style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                  <div
                    className={`input-style has-borders no-icon validate-field mb-4 ${input.unit ? 'input-style-active' : ''}`}
                  >
                    <Controller
                      name="unit"
                      control={control}
                      render={({ field }: any) => (
                        <>
                          <Input
                            id="form4a"
                            onFocus={() => setInput({ unit: true })}
                            style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                            className="form-control validate-text"
                            type="text"
                            placeholder={t('EnterUnit')}
                            autoComplete="off"
                            invalid={errors.unit && true}
                            {...field}
                          />
                          <label htmlFor="form4" className="color-highlight">
                            {t('Unit')}
                          </label>
                          <i className={`fa fa-times disabled invalid color-red-dark ${input.unit ? 'disabled' : ''}`} />
                          <i className="fa fa-check disabled valid color-green-dark" />
                          <em className={`${input.unit ? 'disabled' : ''}`}>({t('Required')})</em>
                          <FormFeedback>{errors.unit?.message}</FormFeedback>
                        </>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </Container>

            <div className="tab-controls tabs-large tabs-rounded" data-highlight="bg-green-dark">
              <div onClick={(e) => setForMe(true)} className={`pointer ${forMe ? 'bg-green-dark' : ''}`}>
                برای خودم
              </div>
              <div onClick={(e) => setForMe(false)} className={`pointer ${forMe ? '' : 'bg-green-dark'}`}>
                برای دیگری
              </div>
            </div>

            {forMe ? null : (
              <div>
                <div
                  style={{ marginTop: '15px' }}
                  ref={messagesEndRef}
                  className={`input-style has-borders no-icon validate-field mb-4 ${input.firstName ? 'input-style-active' : ''}`}
                >
                  <Controller
                    name="anotherAddressOwnerInformation.firstName"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form4a"
                          onFocus={() => setInput({ firstName: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                          className="form-control validate-text"
                          type="text"
                          placeholder={t('EnterFirstName')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('FirstName')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.firstName ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.firstName ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.firstName.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>

                <div
                  className={`input-style has-borders no-icon validate-field mb-4 ${input.lastName ? 'input-style-active' : ''}`}
                >
                  <Controller
                    name="anotherAddressOwnerInformation.lastName"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form4a"
                          onFocus={() => setInput({ lastName: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                          className="form-control validate-text"
                          type="text"
                          placeholder={t('EnterLastName')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('LastName')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.LastName ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.lastName ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.lastName.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>

                <div
                  className={`input-style has-borders no-icon validate-field mb-4 ${
                    input.mobileNumber ? 'input-style-active' : ''
                  }`}
                >
                  <Controller
                    name="anotherAddressOwnerInformation.mobileNumber"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form4a"
                          onFocus={() => setInput({ mobileNumber: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                          className="form-control validate-text"
                          type="text"
                          placeholder={t('شماره تلفن همراه گیرنده خدمات را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('MobileNumber')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.mobileNumber ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.mobileNumber ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.mobileNumber.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>
                <div
                  className={`input-style has-borders no-icon validate-field mb-4 ${
                    input.mobileNumber ? 'input-style-active' : ''
                  }`}
                >
                  <Controller
                    name="anotherAddressOwnerInformation.telNumber"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form4a"
                          onFocus={() => setInput({ telNumber: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                          className="form-control validate-text"
                          type="text"
                          placeholder={t('شماره تلفن ثابت گیرنده خدمات را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('TelNumber')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.telNumber ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.telNumber ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.telNumber.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          {/* <div
            onClick={(e) => hideAddAddressModal(e)}
            style={{ marginTop: '30px' }}
            className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
          >
            ذخیره آدرس
          </div> */}
        </div>
      </Form>
    </div>
  );
};
export default AddAddressModal;
