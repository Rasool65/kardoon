import React, { Component, FunctionComponent, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import '../Style/style.css';
// import '../Style/scss/style.scss';
import Select from 'react-select';
import { IPageProps } from './../../configs/routerConfig/IPageProps';
import { Col, Container, Form, FormFeedback, Input, Row, Button } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_GET_BRANDS } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { URL_MAIN } from '@src/configs/urls';
import { Controller, useForm } from 'react-hook-form';
import { IBrandResultModel } from '@src/models/output/orderDetail/IBrandResultModel';
import { IOrderDetailPageProp } from './IOrderDetailProp';
import { IOrderDetailFirstModel, OrderDetailFirstModelSchema } from './../../models/input/orderDetail/IOrderDetailModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomFunctions } from '@src/utils/custom';

const OrderDetailFirst: FunctionComponent<IOrderDetailPageProp> = ({ handleClickNext }) => {
  let brands: any[] = [];
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const navigate = useNavigate();
  const [brandList, setBrandList] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [input, setInput] = useState<any>({
    model: false,
    serial: false,
    requestDescription: false,
  });

  const GetBrands = () => {
    !!state
      ? httpRequest
          .getRequest<IOutputResult<IBrandResultModel>>(
            `${APIURL_GET_BRANDS}?CityId=${cityId}&ProductId=${state.ProductId}&ServiceTypeId=${state.ServiceTypeId}`
            // 'http://127.0.0.1:2500/getProducts',
          )
          .then((result) => {
            setBrandList(result.data.data);
          })
      : navigate(URL_MAIN);
  };
  const Brands = () => {
    brandList
      ? brandList.forEach((d: any) => {
          brands.push({ value: d.id, label: d.title });
        })
      : '';
  };

  useEffect(() => {
    GetBrands();
  }, []);

  useEffect(() => {
    Brands();
  }, [brandList]);

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderDetailFirstModel>({ mode: 'onChange', resolver: yupResolver(OrderDetailFirstModelSchema) });

  const onSubmit = (data: IOrderDetailFirstModel) => {
    const body = {
      serviceTypeId: state.ServiceTypeId,
      productCategoryId: state.ProductId,
      brand: data.brand,
      model: data.model,
      serial: data.serial,
      requestDescription: data.requestDescription,
    };
    handleClickNext(body);
  };
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div id="page">
      {/* <Header/> */}

      <div
        className="page-content"
        style={{
          paddingBottom: '0px',
        }}
      >
        <div className="page-title page-title-small pointer" style={{ color: '#FFF', width: 'fit-content', fontSize: '16px' }}>
          جزئیات سفارش
        </div>

        <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95" />
          <div className="card-overlay dark-mode-tint" />
          <div className="card-bg bg-20" />
        </div>

        <div className="card card-style p-4">
          <div className="content mb-0">
            <Form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              لطفا جزئیات سفارش خود را مشخص کنید.
              <div>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        noOptionsMessage={() => t('ListIsEmpty')}
                        onFocus={() => GetBrands()}
                        isClearable
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 10,
                        })}
                        className="select-city"
                        placeholder={t('SelectBrand')}
                        options={brands}
                        isSearchable={true}
                        {...field}
                      />
                      <FormFeedback className="d-block">{errors.brand?.value?.message}</FormFeedback>
                    </>
                  )}
                />
                <Container style={{ maxWidth: '100%', marginTop: '15px', padding: '0 0 0 0' }}>
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
                        className={`input-style has-borders no-icon validate-field mb-4 ${
                          input.model ? 'input-style-active' : ''
                        }`}
                      >
                        {/* <input type="tel" className="form-control validate-text" id="form4" placeholder="مدل" />
                      <label htmlFor="form4" className="color-highlight">
                        مدل
                      </label>
                      <i className={`fa fa-times disabled invalid color-red-dark ${true ? 'disabled' : ''}`} />
                      <i className="fa fa-check disabled valid color-green-dark" />
                      <em className={'disabled'}>(اختیاری)</em> */}
                        <Controller
                          name="model"
                          control={control}
                          render={({ field }: any) => (
                            <>
                              <Input
                                id="form4a"
                                onFocus={() => setInput({ model: true })}
                                style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                                className="form-control validate-text"
                                type="text"
                                placeholder={t('EnterModel')}
                                autoComplete="off"
                                invalid={errors.model && true}
                                {...field}
                              />
                              <label htmlFor="form4" className="color-highlight">
                                {t('Model')}
                              </label>
                              <i className={`fa fa-times disabled invalid color-red-dark ${input.model ? 'disabled' : ''}`} />
                              <i className="fa fa-check disabled valid color-green-dark" />
                              <em className={`${input.model ? 'disabled' : ''}`}>({t('Required')})</em>
                              <FormFeedback>{errors.model?.message}</FormFeedback>
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <div
                        className={`input-style has-borders no-icon validate-field mb-4 ${
                          input.serial ? 'input-style-active' : ''
                        }`}
                      >
                        <Controller
                          name="serial"
                          control={control}
                          render={({ field }: any) => (
                            <>
                              <Input
                                id="form4a"
                                onFocus={() => setInput({ serial: true })}
                                style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                                className="form-control validate-text"
                                type="text"
                                placeholder={t('EnterSerial')}
                                autoComplete="off"
                                invalid={errors.serial && true}
                                {...field}
                              />
                              <label htmlFor="form4" className="color-highlight">
                                {t('Serial')}
                              </label>
                              <i className={`fa fa-times disabled invalid color-red-dark ${input.serial ? 'disabled' : ''}`} />
                              <i className="fa fa-check disabled valid color-green-dark" />
                              <em className={`${input.serial ? 'disabled' : ''}`}>({t('Required')})</em>
                              <FormFeedback>{errors.serial?.message}</FormFeedback>
                            </>
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>

                <div
                  className={`input-style has-borders no-icon mb-4 ${input.requestDescription ? 'input-style-active' : ''}`}
                  style={{ margin: '0 0 0 0', padding: '0 0 0 0' }}
                >
                  {/* <textarea
                  // onChange={(e) => this.isTypingToggle(e, 2, !this.state.inputs[2].it)}
                  id="form7"
                  placeholder="شرح درخواست"
                />
                <label htmlFor="form7" className="color-highlight">
                  شرح درخواست
                </label> */}
                  <Controller
                    name="requestDescription"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Input
                          id="form7"
                          onFocus={() => setInput({ requestDescription: true })}
                          style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                          className="form-control validate-text"
                          type="textarea"
                          placeholder={t('EnterRequestDescription')}
                          autoComplete="off"
                          invalid={errors.requestDescription && true}
                          {...field}
                        />
                        <label htmlFor="form7" className="color-highlight">
                          {t('RequestDescription')}
                        </label>
                        <i
                          className={`fa fa-times disabled invalid color-red-dark ${input.requestDescription ? 'disabled' : ''}`}
                        />
                        <i className="fa fa-check disabled valid color-green-dark" />
                        <em className={`${input.requestDescription ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.requestDescription?.message}</FormFeedback>
                      </>
                    )}
                  />
                </div>

                <Container style={{ maxWidth: '100%', margin: '25px 0 20px 0', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      در صورت نیاز درخواست خود را به صورت صوتی ثبت کنید
                    </Col>
                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <img src="images/forTest/voice.png" width="46" height="46" alt="" />
                    </Col>
                  </Row>
                </Container>

                <Container style={{ maxWidth: '100%', margin: '25px 0 20px 0', padding: '0 0 0 0' }}>
                  <Row
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0 0 0 0',
                      marginBottom: '0',
                    }}
                  >
                    <Col xs={9} style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                      در صورت نیاز می توانید تصویری را بارگذاری نمایید
                    </Col>
                    <Col xs={3} style={{ textAlign: 'left', padding: '0 2px 0 12px' }}>
                      <img src="images/forTest/camera.png" width="46" height="46" alt="" />
                    </Col>
                  </Row>
                </Container>
              </div>
              <Button
                type="submit"
                style={{ marginTop: '40px', width: '100%' }}
                className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
              >
                ادامه
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailFirst;
