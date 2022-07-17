import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, FormFeedback, Input, Row, Spinner } from 'reactstrap';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import useHttpRequest from '@src/hooks/useHttpRequest';
import {
  APIURL_GET_CITIES,
  APIURL_GET_COUNTRIES,
  APIURL_GET_DISTRICTS,
  APIURL_GET_PROVINES,
  APIURL_GET_REGIONES,
  APIURL_POST_ADD_USER_ADDRESS,
} from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ICountryResultModel } from '@src/models/output/countryDivision/ICountryResultModel';
import { IProvinceResultModel } from '@src/models/output/countryDivision/IProvinceResultModel';
import { ICitiesResultModel } from './../../models/output/countryDivision/ICitiesResultModel';
import { IRegionResultModel } from '@src/models/output/countryDivision/IRegionResultModel';
import { IDistrictsResultModel } from './../../models/output/countryDivision/IDistrictsResultModel';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { useToast } from './../../hooks/useToast';
import { IAddAddressesResultModel } from '@src/models/output/addAddress/IAddAddressesResultModel';
import { ICloseModal } from './ICloseModal';
import { IUpdateAddressModel, UpdateAddressModelSchema } from '@src/models/input/address/IUpdateAddressModel';

const EditAddressModal: FunctionComponent<ICloseModal> = ({ GetAddresses, EditAddressModalVisible, CurrentAddress }) => {
  const userName = useSelector((state: RootStateType) => state.authentication.userData?.userName);
  const [address, setAddress] = useState<string>('');
  const [countries, setCountries] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any>();
  const [cities, setCities] = useState<any>();
  const [regiones, setRegion] = useState<any>();
  const [distritcs, setDistritcs] = useState<any>();
  const [countryId, setCountryId] = useState<number>();
  const [provinceId, setProvinceId] = useState<number>();
  const [cityId, setCityId] = useState<number>();
  const [regionId, setRegionId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const toast = useToast();
  const messagesEndRef = useRef(null);
  const httpRequest = useHttpRequest();
  const [forMe, setForMe] = useState<Boolean>(true);
  const { t }: any = useTranslation();

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const changeForMe = (forMe: boolean) => {
    setForMe(forMe);
    setTimeout(() => {
      scrollToBottom();
    }, 400);
  };
  const [input, setInput] = useState<any>({
    title: false,
    zipCode: false, // code posti
    cityId: false,
    countryId: false,
    regionId: false,
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

  const GetCountryList = () => {
    httpRequest.getRequest<IOutputResult<ICountryResultModel>>(`${APIURL_GET_COUNTRIES}`).then((result) => {
      setCountries(result.data.data);
    });
  };
  const GetProvincesList = (countryId: number) => {
    httpRequest.getRequest<IOutputResult<IProvinceResultModel>>(`${APIURL_GET_PROVINES}?ParentId=${countryId}`).then((result) => {
      setProvinces(result.data.data);
    });
  };
  const GetCityList = (provinesId: number) => {
    httpRequest.getRequest<IOutputResult<ICitiesResultModel>>(`${APIURL_GET_CITIES}?ParentId=${provinesId}`).then((result) => {
      setCities(result.data.data);
    });
  };
  const GetRegionList = (citiesId: number) => {
    httpRequest.getRequest<IOutputResult<IRegionResultModel>>(`${APIURL_GET_REGIONES}?ParentId=${citiesId}`).then((result) => {
      setRegion(result.data.data);
    });
  };
  const GetDistrictList = (regionId: number) => {
    httpRequest
      .getRequest<IOutputResult<IDistrictsResultModel>>(`${APIURL_GET_DISTRICTS}?ParentId=${regionId}`)
      .then((result) => {
        setDistritcs(result.data.data);
      });
  };

  const onSubmit = (data: IUpdateAddressModel) => {
    setLoading(true);
    const body: IUpdateAddressModel = {
      refkey: CurrentAddress?.refkey,
      userName: userName,
      countryId: countryId,
      cityId: cityId,
      provinceId: provinceId,
      regionId: regionId,
      districtId: districtId,
      zipCode: data.zipCode,
      title: data.title,
      homeTel: data.homeTel,
      address: data.address,
      number: data.number,
      unit: data.unit,
    };
    if (data) {
      httpRequest
        .postRequest<IOutputResult<IAddAddressesResultModel>>(APIURL_POST_ADD_USER_ADDRESS, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          document.getElementById('close-add-address-Modal')?.click();
          GetAddresses();
          setLoading(false);
        })
        .finally(() => {});
    }
  };

  useEffect(() => {
    GetCountryList();
    CustomFunctions();
  }, []);

  useEffect(() => {
    console.log(CurrentAddress?.address);
    debugger;
    setTimeout(() => {
      setAddress(CurrentAddress?.address!);
    }, 10);
  });
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateAddressModel>({ mode: 'onChange', resolver: yupResolver(UpdateAddressModelSchema) });
  return (
    <div
      className={`menu menu-box-bottom menu-box-detached rounded-m ${EditAddressModalVisible ? `menu-active` : ``}`}
      data-menu-height="600"
      style={{ display: 'inherit' }}
      data-menu-effect="menu-over"
    >
      <a id="close-add-address-Modal" className="close-menu" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-4" style={{ marginBottom: '0px' }}>
          <div style={{ height: '550px', overflow: 'scroll' }}>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.title ? 'input-style-active' : ''}`}>
              <Controller
                name="title"
                defaultValue={CurrentAddress?.title}
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form4a"
                      onFocus={() => setInput({ title: true })}
                      defaultValue={CurrentAddress?.title}
                      style={{ backgroundPosition: 'left', marginTop: '10px', height: '53px' }}
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
                      type="number"
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
            {/* کشور */}
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.countryId ? 'input-style-active' : ''}`}>
              <Select
                noOptionsMessage={() => t('ListIsEmpty')}
                isClearable
                className="select-city"
                placeholder={t('SelectCountry')}
                options={countries}
                isSearchable={true}
                onChange={(e: any) => {
                  e ? (setCountryId(e.value), GetProvincesList(e.value)) : setCountryId(undefined),
                    setProvinces([]),
                    GetCountryList();
                }}
              />
            </div>
            {/* استان */}
            <div
              className={`input-style has-borders no-icon validate-field mb-4 ${input.provinceId ? 'input-style-active' : ''}`}
            >
              <Select
                noOptionsMessage={() => t('ListIsEmpty')}
                isClearable
                className="select-city"
                placeholder={t('SelectProvince')}
                options={provinces}
                isSearchable={true}
                onChange={(e: any) => {
                  e ? (setProvinceId(e.value), GetCityList(e.value)) : setProvinceId(undefined),
                    setCities([]),
                    GetProvincesList(countryId!);
                }}
              />
            </div>
            {/* شهر */}
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.cityId ? 'input-style-active' : ''}`}>
              <Select
                noOptionsMessage={() => t('ListIsEmpty')}
                isClearable
                className="select-city"
                placeholder={t('SelectCity')}
                options={cities}
                isSearchable={true}
                onChange={(e: any) => {
                  e ? (setRegionId(e.value), GetRegionList(e.value)) : setRegion([]), GetCityList(provinceId!);
                }}
              />
            </div>
            {/* منطقه */}
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.region ? 'input-style-active' : ''}`}>
              <Select
                noOptionsMessage={() => t('ListIsEmpty')}
                isClearable
                className="select-city"
                placeholder={t('SelectRegion')}
                options={regiones}
                isSearchable={true}
                onChange={(e: any) => {
                  e ? (setDistrictId(e.value), GetDistrictList(e.value)) : setDistrictId(undefined), setDistritcs([]);
                  // GetRegionList(cityId!);
                }}
              />
            </div>
            {/* محله */}
            <div
              className={`input-style has-borders no-icon validate-field mb-4 ${input.districtId ? 'input-style-active' : ''}`}
            >
              <Select
                noOptionsMessage={() => t('ListIsEmpty')}
                isClearable
                className="select-city"
                placeholder={t('SelectDistrict')}
                options={distritcs}
                isSearchable={true}
                onChange={(e: any) => {
                  setDistrictId(e.value);
                }}
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
                      placeholder={t('EnterHomeTel')}
                      autoComplete="off"
                      invalid={errors.homeTel && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('HomeTel')}
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
                            type="number"
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
                            type="number"
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

            <b className="tab-controls tabs-large tabs-rounded" data-highlight="bg-green-dark">
              <Button onClick={(e) => changeForMe(true)} className={`${forMe ? 'bg-green-dark' : ''}`}>
                {t('ForMe')}
              </Button>
              <Button onClick={(e) => changeForMe(false)} className={`${forMe ? '' : 'bg-green-dark'}`}>
                {t('ForOther')}
              </Button>
            </b>

            {forMe ? null : (
              <div>
                <div
                  style={{ marginTop: '25px' }}
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
                          invalid={errors.anotherAddressOwnerInformation?.firstName?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('FirstName')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.firstName ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.firstName ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.firstName?.message}</FormFeedback>
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
                          invalid={errors.anotherAddressOwnerInformation?.lastName?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('LastName')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.LastName ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.lastName ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.lastName?.message}</FormFeedback>
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
                          type="number"
                          placeholder={t('شماره تلفن همراه گیرنده خدمات را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.mobileNumber?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('MobileNumber')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.mobileNumber ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.mobileNumber ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.mobileNumber?.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>
                <div
                  className={`input-style has-borders no-icon validate-field mb-4 ${input.telNumber ? 'input-style-active' : ''}`}
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
                          type="number"
                          placeholder={t('شماره تلفن ثابت گیرنده خدمات را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.anotherAddressOwnerInformation?.telNumber?.message && true}
                          {...field}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('TelNumber')}
                        </label>
                        <i className={`fa fa-times disabled invalid color-red-dark ${input.telNumber ? 'disabled' : ''}`} />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.telNumber ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.anotherAddressOwnerInformation?.telNumber?.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <Button
            type="submit"
            style={{ marginTop: '30px' }}
            className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
          >
            {loading ? <Spinner /> : 'ذخیره آدرس'}
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default EditAddressModal;
