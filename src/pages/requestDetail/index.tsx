import { ComponentType, FunctionComponent, useState } from 'react';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { APIURL_POST_CREATE_REQUEST } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import RequestDetailFirst from './RequestDetailFirst';
import RequestDetailConfirm from './RequestDetailSecond';
import { IRequestDetail } from '@src/models/input/requestDetail/IRequestDetail';
import { IRequestDetailSecond } from './IRequestDetailProp';
import { ICreateRequestResultModel } from '@src/models/output/requestDetail/ICreateRequestResultModel';
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
    Component: RequestDetailFirst,
  },
  {
    id: 1,
    name: 'تکمیلی',
    Component: RequestDetailConfirm,
  },
];

const RequestDetail: FunctionComponent<IPageProps> = (prop) => {
  const toast = useToast();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const httpRequest = useHttpRequest(RequestDataType.formData);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [CurrentStep, setCurrentStep] = useState(steps[activeStep]);
  const [requestDetail, setRequestDetail] = useState<IRequestDetail[]>([]);

  const onClickNext = (data: IRequestDetail) => {
    setRequestDetail([...requestDetail, data]);
    setCurrentStep(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };
  const onClickPrevious = () => {
    setCurrentStep(steps[activeStep - 1]);
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = (body: IRequestDetailSecond) => {
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
        if (requestDetail[i]?.problemsId?.length! > 0) {
          requestDetail[i].problemsId?.forEach((e) => {
            formData.append('problemId', e.value?.toString()!);
          });
        }
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
  };
  return (
    <>
      <CurrentStep.Component handleClickNext={onClickNext} handleClickPrevious={onClickPrevious} handleSubmit={handleSubmit} />
    </>
  );
};

export default RequestDetail;
