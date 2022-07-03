import React, { Component, ComponentType, FunctionComponent, useState } from 'react';
import Select from 'react-select';
import { IPageProps } from './../../configs/routerConfig/IPageProps';
import { Col, Container, Input, Row } from 'reactstrap';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_GET_BRANDS, APIURL_POST_CREATE_REQUEST, APIURL_SEND_PASSWORD } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { URL_MAIN } from '@src/configs/urls';
import { Controller, useForm } from 'react-hook-form';
import { IBrandResultModel } from '@src/models/output/orderDetail/IBrandResultModel';
import OrderDetailFirst from './OrderDetailFirst';
import OrderDetailConfirm from './OrderDetailSecond';
import { ICreateConsumerRequest } from '@src/models/input/orderDetail/ICreateConsumerRequest';
import { IRequestDetail } from '@src/models/input/orderDetail/IRequestDetail';
import { IOrderDetailSecond } from './IOrderDetailProp';
import { ICreateRequestResultModel } from '@src/models/output/orderDetail/ICreateRequestResultModel';
import { toast } from 'react-toastify';
import { useToast } from '@src/hooks/useToast';

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
  let requestDetail: IRequestDetail[];
  const toast = useToast();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const cityId = userData?.profile.residenceCityId;
  const userId = userData?.userId;
  const navigate = useNavigate();
  const httpRequest = useHttpRequest(RequestDataType.formData);
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [data, setData] = useState<ICreateConsumerRequest>();
  // const [requestDetail, setRequestDetail] = useState<IRequestDetail[]>();
  const onClickNext = (data: IRequestDetail) => {
    // save to state
    requestDetail.push(data);
    debugger;
    // setRequestDetail(requestDetail);
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
    if (userData?.userId) formData.append('userId', userData.userId?.toString());
    if (body.presenceDate) formData.append('presenceDate', body.presenceDate?.toString());
    if (body.presenceShift) formData.append('presenceShift', body.presenceShift?.toString());
    if (body.refkey) formData.append('refkey', body.refkey?.toString());
    formData.append('isUrgent', body.isUrgent.toString());

    for (var i = 0; i < requestDetail.length; i++) {
      if (requestDetail[i]?.serviceTypeId) formData.append('serviceTypeId', requestDetail[i].serviceTypeId!.toString());
      if (requestDetail[i]?.productCategoryId)
        formData.append('productCategoryId', requestDetail[i].productCategoryId!.toString());
      formData.append('brandId', requestDetail[i].brandId.value.toString());
      formData.append('model', requestDetail[i].model);
      formData.append('serial', requestDetail[i].serial);
      formData.append('requestDescription', requestDetail[i].requestDescription);
      if (requestDetail[i].audioMessage) formData.append('audioMessage', requestDetail[i].audioMessage);
      if (requestDetail[i].imageMessage != undefined) formData.append('imageMessage', requestDetail[i].imageMessage!);
      if (requestDetail[i].videoMessage) formData.append('videoMessage', requestDetail[i].videoMessage);
    }
    if (formData) {
      httpRequest
        .postRequest<IOutputResult<ICreateRequestResultModel>>(APIURL_POST_CREATE_REQUEST, formData)
        .then((result) => {
          toast.showSuccess(result.data.message);
        })
        .finally(() => {});
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
