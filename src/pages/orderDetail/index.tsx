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
import { IOrderDetailSecond } from './IOrderDetailProp';

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
  const handleSubmit = (body: IOrderDetailSecond) => {
    debugger;
    var formData = new FormData();
    if (userData?.userId) formData.append('userId', userData?.userId.toString());
    if (body.presenceDate) formData.append('presenceDate', body.presenceDate?.toString());
    if (body.presenceShift) formData.append('presenceShift', body.presenceShift?.toString());
    if (body.refkey) formData.append('refkey', body.refkey?.toString());
    formData.append('isUrgent', body.isUrgent.toString());
    let requests = [{ requestDetail }];
    for (var i = 0; i < requests.length; i++) {
      if (requests) formData.append('serviceTypeId', requestDetail.ServiceTypeId);
      formData.append('productCategoryId', requestDetail.ProductId);
      formData.append('brandId', requestDetail.brandId.value.toString());
      formData.append('model', requestDetail.model);
      formData.append('serial', requestDetail.serial);
      formData.append('requestDescription', requestDetail.requestDescription);
      if (audioFile) formData.append('audioMessage', requestDetail.audioFile);
      if (imageFile) formData.append('imageMessage', requestDetail.imageFile);
      if (videoFile) formData.append('videoMessage', requestDetail.videoFile);
    }

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
