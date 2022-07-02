import React, { Component, ComponentType, FunctionComponent, useState } from 'react';
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
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const cityId = userData?.profile.residenceCityId;
  const userId = userData?.userId;
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [data, setData] = useState<ICreateConsumerRequest>();
  const [requestDetail, setRequestDetail] = useState<IRequestDetail>();

  const onClickNext = (requestDetail: IRequestDetail) => {
    // save to state
    debugger;
    setRequestDetail(requestDetail);
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickPrevious = () => {
    setCurrentStep(steps[activeStep - 1]);
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = () => {
    debugger;
    // var formData = new FormData();
    // formData.append('serviceTypeId', state.ServiceTypeId);
    // formData.append('productCategoryId', state.ProductId);
    // formData.append('brandId', data.brandId.value.toString());
    // formData.append('model', data.model);
    // formData.append('serial', data.serial);
    // formData.append('requestDescription', data.requestDescription);
    // if (audioFile) formData.append('audioMessage', audioFile);
    // if (imageFile) formData.append('imageMessage', imageFile);
    // if (videoFile) formData.append('videoMessage', videoFile);
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
