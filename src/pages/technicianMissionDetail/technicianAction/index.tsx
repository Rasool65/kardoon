import { FunctionComponent, useEffect, useState } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomFunctions } from '@src/utils/custom';
import { Button, Form, Input, Spinner } from 'reactstrap';

import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import {
  APIURL_GET_SERVICES_TITLE,
  APIURL_GET_SERVICES_TYPES,
  APIURL_POST_REQUEST_DETAIL_ACTION,
} from '@src/configs/apiConfig/apiUrls';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';

import { useToast } from './../../../hooks/useToast';

const Action: FunctionComponent<IPageProps> = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const [serviceTypes, setServiceTypes] = useState<any>();
  const [serviceTitle, setServiceTitle] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<Number>(0);
  const technicianId = useSelector((state: RootStateType) => state.authentication.userData?.userId);

  const GetServiceType = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<any>>(`${APIURL_GET_SERVICES_TYPES}`).then((result) => {
      setServiceTypes(result.data.data);
      setLoading(false);
    });
  };
  const GetServiceTitle = (serviceTypeId: number) => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<any>>(
        `${APIURL_GET_SERVICES_TITLE}?ProductCategoryId=${state.productCategoryId}&ServiceTypeId=${serviceTypeId}`
      )
      .then((result) => {
        setServiceTitle(result.data.data);
        setLoading(false);
      });
  };

  // const {
  //   register,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ITechnicianActionModel>({ mode: 'onChange', resolver: yupResolver(AddTechnicianActionModelSchema) });

  const Submit = (e: any) => {
    e.preventDefault();
    debugger;
    const body = {
      id: state.requestDetailId,
      technicianId: technicianId,
      price: parseInt(e.target.price.value),
      action: parseInt(e.target.serviceTitle.value),
      count: parseInt(e.target.count.value),
      serviceTypeId: parseInt(e.target.serviceType.value),
      description: e.target.description.value,
    };
    setLoading(true);
    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_REQUEST_DETAIL_ACTION}`, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    GetServiceType();
    document.title = props.title;
    CustomFunctions();
  }, []);
  return (
    <>
      <div id="page">
        <div className="page-content">
          <div className="page-title page-title-small">
            <h2>
              <a href="#" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-right mx-2"></i>
                بازگشت
              </a>
            </h2>
          </div>
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>
        </div>
        <Form onSubmit={(e: any) => Submit(e)}>
          <div className="d-flex m-2" style={{ justifyContent: 'space-around' }}>
            <Select
              isLoading={loading}
              name="serviceType"
              className="select-city select-width-action m-2"
              options={serviceTypes}
              placeholder={'نوع خدمات'}
              onChange={(e: any) => {
                setServiceTitle(null);
                GetServiceTitle(e?.value);
              }}
            />
            <Select
              isLoading={loading}
              name="serviceTitle"
              options={serviceTitle}
              onChange={(e: any) => setPrice(e.price)}
              className="select-city select-width-action m-2 "
              placeholder={'عنوان خدمات'}
            />
          </div>
          <div className="m-2 p-3">
            <Input
              // onChange={(e: any) => setDescription(e.target.value)}

              name="description"
              type="textarea"
              style={{ height: '15vh' }}
              placeholder="شرح"
            />
          </div>
          <div className="d-flex m-3" style={{ justifyContent: 'space-around' }}>
            <Input
              className="m-2 p-3"
              name="price"
              type="text"
              onChange={(e: any) => {
                setTotalPrice(e.target.value * count), setPrice(e.target.value);
              }}
              defaultValue={UtilsHelper.threeDigitSeparator(price)}
              placeholder="مبلغ هزینه"
            />
            <Input
              className="m-2 p-3"
              type="number"
              name="count"
              defaultValue={0}
              onChange={(e: any) => {
                setTotalPrice(e.target.value * price);
                setCount(e.target.value);
              }}
              placeholder="تعداد"
            />
          </div>
          <div className="d-flex m-3" style={{ justifyContent: 'center' }}>
            <label className="m-2 select-width-action">جمع مبلغ کل</label>
            <label className="m-2 select-width-action">{UtilsHelper.threeDigitSeparator(totalPrice)}</label>
          </div>
          <div className="d-flex " style={{ justifyContent: 'space-around' }}>
            <Button type="submit" style={{ width: '90%', height: '50px' }} className="btn btn-success m-2">
              {loading ? <Spinner /> : 'افزودن'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Action;
