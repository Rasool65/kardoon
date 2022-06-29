import React, { Component, ComponentType, FunctionComponent, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import '../Style/style.css';
// import '../Style/scss/style.scss';
import Select from 'react-select';
import { IPageProps } from './../../configs/routerConfig/IPageProps';
import { Col, Container, Input, Row } from 'reactstrap';
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
import OrderDetailFirst from './OrderDetailFirst';
import OrderDetailConfirm from './OrderDetailSecond';
import { ICreateConsumerRequest } from '@src/models/input/orderDetail/ICreateConsumerRequest';
import { IRequestDetail } from '@src/models/input/orderDetail/IRequestDetail';

export type ISteps = {
  id: number;
  name: string;
  Component: ComponentType<any>;
};

const steps: ISteps[] = [
  {
    id: 0,
    name: 'اولیه',
    Component: OrderDetailFirst,
  },
  {
    id: 1,
    name: 'تکمیلی',
    Component: OrderDetailConfirm,
  },
];

const OrderDetail: FunctionComponent<IPageProps> = (prop) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [data, setData] = useState<ICreateConsumerRequest>();

  const onClickNext = (body: IRequestDetail) => {
    // save to state
    debugger;
    data?.requestDetail.push(body);
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickPrevious = () => {
    setCurrentStep(steps[activeStep - 1]);
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = () => {
    //state
    // send to request api
  };
  return (
    <>
      <CurrentStep.Component
        handleClickNext={onClickNext}
        handleClickPrevious={onClickPrevious}
        handleSubmit={handleSubmit}
        // loadingPage={loadingPage}
        // loadingOrder={loadingOrder}
      />
    </>
  );
};

export default OrderDetail;
