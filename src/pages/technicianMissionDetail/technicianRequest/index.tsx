import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, FormFeedback, Input, Spinner } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import {
  APIURL_GET_CATEGORIES,
  APIURL_GET_DEVICE_TYPE_WITH_PARENT_INFO,
  APIURL_GET_SERVICES,
  APIURL_POST_REQUEST_TECHNICIAN,
} from '@src/configs/apiConfig/apiUrls';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { useToast } from '@src/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from './../template';
import ConfirmModal from './ConfirmModal';
import { IServicesResultModel } from '@src/models/output/services/IServicesResultModel';
import { IProductsResultModel } from '@src/models/output/products/IProductsResultModel';
import {
  AddTechnicianRequestModelSchema,
  ITechnicianRequestModel,
} from '@src/models/input/technicianRequest/ITechnicianRequestModel';

const TechnicianRequest: FunctionComponent<IPageProps> = (props) => {
  let newCategory: any[];
  let newProducts: any[];
  const toast = useToast();
  const { t }: any = useTranslation();
  const [input, setInput] = useState<any>({
    description: false,
    count: false,
    price: false,
    sourceCost: false,
    discountAmount: false,
  });
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const httpRequest = useHttpRequest();

  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [products, setProducts] = useState<any>();
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  const [backgroundDimmer, setBackgroundDimmer] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>();
  const buttonRef = useRef(null);
  const userData = useSelector((state: RootStateType) => state.authentication.userData);

  const GetServices = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IServicesResultModel>>(`${APIURL_GET_SERVICES}?CityId=${userData?.profile.residenceCityId}`)
      .then((result) => {
        setServices(result.data.data);
        setLoading(false);
      });
  };
  const GetCategoryList = (serviceTypeId: number) => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<any>>(
        `${APIURL_GET_CATEGORIES}?CityId=${userData?.profile.residenceCityId}&ServiceTypeId=${serviceTypeId}`
      )
      .then((result) => {
        if (result.data.data) {
          newCategory = [];
          for (var i = 0; i < result.data.data.length; i++) {
            newCategory.push({ value: result.data.data[i].id, label: result.data.data[i].name });
          }
        }
        setCategories(newCategory);
        setLoading(false);
      });
  };
  const GetProducts = (productCategoryId: number, serviceTypeId: number) => {
    setLoading(true),
      httpRequest
        .getRequest<IOutputResult<IProductsResultModel[]>>(
          `${APIURL_GET_DEVICE_TYPE_WITH_PARENT_INFO}?CityId=${userData?.profile.residenceCityId}&ProductCategoryId=${productCategoryId}&ServiceTypeId=${serviceTypeId}`
        )
        .then((result) => {
          if (result.data.data) {
            newProducts = [];
            for (var i = 0; i < result.data.data.length; i++) {
              newProducts.push({ value: result.data.data[i].id, label: result.data.data[i].title });
            }
          }

          setProducts(newProducts);
          setLoading(false);
        });
  };

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITechnicianRequestModel>({ mode: 'onChange', resolver: yupResolver(AddTechnicianRequestModelSchema) });

  const resetForm = () => {
    reset({
      productGroup: { label: '', value: 0 },
      serviceTypeId: { label: '', value: 0 },
      productCategoryId: { label: '', value: 0 },
      requestDescription: '',
    });
  };
  const onSubmit = (data: ITechnicianRequestModel) => {
    setLoading(true);
    const body = {
      requestNumber: state.requestNumber,
      technicianId: Number(userData?.userId),
      serviceTypeId: data.serviceTypeId.value,
      productCategoryId: data.productCategoryId.value,
      requestDescription: data.requestDescription,
    };

    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_REQUEST_TECHNICIAN}`, body)
        .then((result) => {
          resetForm();
          toast.showSuccess(result.data.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    GetServices();
    CustomFunctions();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div
        className={`menu-hider ${backgroundDimmer ? 'menu-active' : ''}`}
        onClick={() => {
          setBackgroundDimmer(false);
          setConfirmModalVisible(false);
        }}
      ></div>
      <div id="page">
        <div className="page-content">
          <div className="page-title page-title-small">
            <h2>
              <a style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="card "
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className="area-1 m-3 d-flex justify-content-between">
              <div className="m-2">
                <h5 className="m-1">شماره درخواست :</h5>
              </div>
              <div className="m-2">
                <h5 className="m-1 p-2">{state.requestNumber}</h5>
              </div>
            </div>
            <div className=" d-flex justify-content-between" style={{ width: '90%' }}>
              <div className="m-2">
                <h5 className="m-1">نام مشتری :</h5>
              </div>
              <div className="m-2">
                <h5 className="m-1">{state.consumerFullName}</h5>
              </div>
            </div>
            <div className=" d-flex justify-content-between" style={{ width: '90%' }}>
              <div className="m-2">
                <h5 className="m-1">آدرس:</h5>
              </div>
              <div className="m-2">
                <h5 className="m-1">{state.consumerAddress}</h5>
              </div>
            </div>
          </div>
          <div className="m-2">
            <Controller
              name="serviceTypeId"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isClearable
                    isLoading={loading}
                    id="form1a"
                    options={services}
                    className="select-city select-width-action m-2"
                    placeholder={'نوع خدمت'}
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e);
                      setCategories(null);
                      e.value && GetCategoryList(e?.value), setCategoryId(e?.value);
                    }}
                  />
                  <FormFeedback className="d-block">{errors?.serviceTypeId?.value?.message}</FormFeedback>
                </>
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="productGroup"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isClearable
                    isLoading={loading}
                    id="form1a"
                    options={categories}
                    className="select-city select-width-action m-2"
                    placeholder={'گروه محصول'}
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e);
                      GetProducts(categoryId!, e.value);
                    }}
                  />
                  <FormFeedback className="d-block">{errors?.productCategoryId?.value?.message}</FormFeedback>
                </>
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="productCategoryId"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isClearable
                    isLoading={loading}
                    id="form1a"
                    options={products}
                    className="select-city select-width-action m-2"
                    placeholder={'نوع محصول'}
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e);
                      // GetProducts(categoryId!, e.value);
                    }}
                  />
                  <FormFeedback className="d-block">{errors?.productCategoryId?.value?.message}</FormFeedback>
                </>
              )}
            />
          </div>
          <div className="m-3">
            <div className={`input-style has-borders no-icon mb-4 ${input.introductionCode ? 'input-style-active' : ''}`}>
              <Controller
                name="requestDescription"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ description: true })}
                      style={{ backgroundPosition: 'left' }}
                      className="form-control validate-text"
                      type="textarea"
                      placeholder={'توضیحات درخواست'}
                      autoComplete="off"
                      invalid={errors?.requestDescription && true}
                      {...field}
                    />
                    <FormFeedback>{errors?.requestDescription?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          {/* formGenerator here*/}
          <div ref={buttonRef} className="d-flex " style={{ justifyContent: 'space-around' }}>
            <Button
              // onClick={() => {
              //   setConfirmModalVisible(true), setBackgroundDimmer(true);
              // }}
              type="submit"
              style={{ width: '90%', height: '50px' }}
              className="btn btn-success m-2"
            >
              {loading ? <Spinner /> : '+ ثبت درخواست'}
            </Button>
          </div>
        </Form>
      </div>

      <ConfirmModal
        confirmModalVisible={confirmModalVisible}
        accept={() => {
          setConfirmModalVisible(false), setBackgroundDimmer(false);
        }}
        reject={() => {
          setConfirmModalVisible(false), setBackgroundDimmer(false);
        }}
      />
    </>
  );
};

export default TechnicianRequest;
