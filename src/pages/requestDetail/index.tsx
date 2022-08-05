import { ComponentType, FunctionComponent, useState } from 'react';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_POST_CREATE_REQUEST } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import RequestDetailFirst from './RequestDetailFirst';
import RequestDetailConfirm from './RequestDetailSecond';
import { IRequestDetail } from '@src/models/input/requestDetail/IRequestDetail';
import { IRequestDetailSecond } from './IRequestDetailProp';
import { ICreateRequestResultModel } from '@src/models/output/requestDetail/ICreateRequestResultModel';
import { useToast } from '@src/hooks/useToast';
import { ISubmitEvent } from '@rjsf/core';
import RequestDetailZero from './RequestDetailZero';
import { useNavigate } from 'react-router-dom';
import { URL_MAIN } from '@src/configs/urls';
import { handleAddRequest } from '@src/redux/reducers/requestReducer';

export type ISteps = {
  id: number;
  name: string;
  Component: ComponentType<any>;
};

const steps: ISteps[] = [
  {
    id: 0,
    name: 'فرم ساز',
    Component: RequestDetailZero,
  },
  {
    id: 1,
    name: 'اولیه',
    Component: RequestDetailFirst,
  },
  {
    id: 2,
    name: 'تکمیلی',
    Component: RequestDetailConfirm,
  },
];

const RequestDetail: FunctionComponent<IPageProps> = (prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const httpRequest = useHttpRequest(RequestDataType.formData);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [requestDetail, setRequestDetail] = useState<IRequestDetail[]>([]);
  const [formGenDetail, setFormGenDetail] = useState<ISubmitEvent<unknown>[]>([]);

  const onClickNextToFirst = (data: ISubmitEvent<unknown>) => {
    dispatch(handleAddRequest(data));
    // setFormGenDetail([...formGenDetail, data]); bayad be redux esh ezafe beshe
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickNextToSecond = (data: IRequestDetail) => {
    // setRequestDetail([...requestDetail, data]); bayad be redux esh ezafe beshe
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickMore = (data: IRequestDetail) => {
    debugger;
    // setRequestDetail([...requestDetail, data]); bayad be redux esh ezafe beshe
    const Data = {
      formGenDetail,
      requestDetail,
    };
    dispatch(handleAddRequest(Data));
    // save redux
    navigate(URL_MAIN);
    // setCurrentStep(steps[activeStep - 2]);
    // setActiveStep(activeStep - 2);
  };
  const handleSubmit = (body: IRequestDetailSecond) => {
    //1- request detail va formGen az redux load beshe
    //2- set beshe tooye state
    debugger;
    var formData = new FormData();
    if (userData?.userId) formData.append('userId', userData.userId?.toString());
    if (body.presenceDate) formData.append('presenceDate', body.presenceDate?.toString());
    if (body.presenceShift) formData.append('presenceShift', body.presenceShift?.toString());
    if (body.refkey) formData.append('refkey', body.refkey?.toString());
    formData.append('isUrgent', body.isUrgent.toString());
    for (var i = 0; i < formGenDetail.length; i++) {
      formData.append(`formGenDetail[${i}]`, formGenDetail[i] ? JSON.stringify(formGenDetail[i].formData) : 'null');
    }
    for (var i = 0; i < requestDetail.length; i++) {
      if (requestDetail[i]?.serviceTypeId)
        formData.append(`requestDetail[${i}].serviceTypeId`, requestDetail[i].serviceTypeId!.toString());
      // if (requestDetail[i]?.productCategoryId)
      if (requestDetail[i]?.attributes?.length! > 0) {
        requestDetail[i].attributes?.forEach((e) => {
          formData.append(`requestDetail[${i}].attributes[0].attributeId`, e.attributeId?.toString()!);
          formData.append(`requestDetail[${i}].attributes[0].attributeValue`, e.attributeValue?.toString()!);
          formData.append(`requestDetail[${i}].attributes[0].attributeValueId`, e.attributeValueId?.toString()!);
        });
      }
      formData.append(`requestDetail[${i}].productCategoryId`, requestDetail[i].productCategoryId!.toString());
      formData.append(`requestDetail[${i}].requestDescription`, requestDetail[i].requestDescription);
      if (requestDetail[i].audioMessage) formData.append(`requestDetail[${i}].audioMessage`, requestDetail[i].audioMessage);
      if (requestDetail[i].imageMessage != undefined && requestDetail[i].imageMessage?.length! > 0)
        requestDetail[i].imageMessage?.forEach((imageFile: any) => {
          console.log(requestDetail[i].imageMessage);
          formData.append(`requestDetail[${i}].imageMessage`, imageFile);
        });
      if (requestDetail[i].videoMessage) formData.append(`requestDetail[${i}].videoMessage`, requestDetail[i].videoMessage);
    }
    if (formData) {
      setIsLoading(true);
      httpRequest
        .postRequest<IOutputResult<ICreateRequestResultModel>>(APIURL_POST_CREATE_REQUEST, formData)
        .then((result) => {
          navigate(URL_MAIN);
          toast.showSuccess(result.data.message);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <CurrentStep.Component
        handleClickNextToFirst={onClickNextToFirst}
        handleClickNextToSecond={onClickNextToSecond}
        handleClickMore={onClickMore}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default RequestDetail;
