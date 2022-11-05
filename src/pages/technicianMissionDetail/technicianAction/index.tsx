import { FunctionComponent, useEffect, useLayoutEffect, useState } from 'react';
import Num2persian from 'num2persian';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Spinner,
  UncontrolledDropdown,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { RWebShare } from 'react-web-share';
import { UncontrolledTooltip } from 'reactstrap';
import {
  APIURL_DELETE_ACTION,
  APIURL_GET_SERVICES_TITLE,
  APIURL_GET_SERVICES_TYPES,
  APIURL_GET_SOURCE_OF_COST,
  APIURL_GET_TECHNICIAN_INVOICE,
  APIURL_POST_REQUEST_DETAIL_ACTION,
  APIURL_POST_TECHNICIAN_INVOICE_CHECKOUT,
} from '@src/configs/apiConfig/apiUrls';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { ECostSource, IInvoiceActionResultModel } from '@src/models/output/missionDetail/IInvoiceActionResultModel';
import {
  AddTechnicianActionModelSchema,
  ISourceCost,
  ITechnicianActionModel,
} from '@src/models/input/technicianMission/ITechnicianActionModel';
import { useToast } from '@src/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from './../template';
import { URL_TECHNICIAN_FACTOR } from '@src/configs/urls';
import { APIURL_POST_TECHNICIAN_INVOICE_CHECKOUT_ONLINE } from './../../../configs/apiConfig/apiUrls';
import RemoveConfirmModal from './RemoveConfirmModal';

const Action: FunctionComponent<IPageProps> = (props) => {
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
  const [serviceTypes, setServiceTypes] = useState<any>();
  const [serviceTitle, setServiceTitle] = useState<any>();
  const [sourceCost, setSourceCost] = useState<any>();
  const [invoice, setInvoice] = useState<IInvoiceActionResultModel[]>();
  const [price, setPrice] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const [paymentId, setPaymentId] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<Number>(0);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] = useState<boolean>(false);
  const [backgroundDimmer, setBackgroundDimmer] = useState<boolean>(false);
  const technicianId = useSelector((state: RootStateType) => state.authentication.userData?.userId);

  const RemoveAction = (id: number) => {
    const body = {
      technicianId: technicianId,
      id: id,
      actorUserId: technicianId,
    };
    setLoading(true);
    httpRequest.deleteRequest<IOutputResult<any>>(`${APIURL_DELETE_ACTION}`, body).then((result) => {
      toast.showSuccess(result.data.message);
      setLoading(false);
      GetInvoiceAction();
    });
  };

  const GetServiceType = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<any>>(`${APIURL_GET_SERVICES_TYPES}`).then((result) => {
      setServiceTypes(result.data.data);
      setLoading(false);
    });
  };
  const GetServiceTitle = (serviceTypeId: number) => {
    debugger;
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
  const GetSourceCost = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<any>>(`${APIURL_GET_SOURCE_OF_COST}`).then((result) => {
      setSourceCost(result.data.data);
      setLoading(false);
    });
  };
  const GetInvoiceAction = () => {
    state.requestDetailId &&
      (setLoading(true),
      httpRequest
        .getRequest<IOutputResult<IInvoiceActionResultModel[]>>(
          `${APIURL_GET_TECHNICIAN_INVOICE}?TechnicianId=${technicianId}&RequestDetailId=${state.requestDetailId}`
        )
        .then((result) => {
          setInvoice(result.data.data);
          setLoading(false);
        }));
  };

  const Checkout = (paymentId: number, consumerPaymentAmount: number) => {
    const body = {
      paymentId: paymentId,
      technicianId: technicianId,
      consumerPaymentAmount: consumerPaymentAmount,
      userId: technicianId,
    };
    setCheckoutLoading(true);
    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_TECHNICIAN_INVOICE_CHECKOUT}`, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          GetInvoiceAction();
          setCheckoutLoading(false);
        })
        .finally(() => {
          setCheckoutLoading(false);
        });
  };
  const CheckoutOnline = (paymentId: number, consumerPaymentAmount: number) => {
    const body = {
      paymentId: paymentId,
      consumerPaymentAmount: consumerPaymentAmount,
      userId: technicianId,
    };
    setCheckoutLoading(true);
    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_TECHNICIAN_INVOICE_CHECKOUT_ONLINE}`, body)
        .then((result) => {
          window.open(result.data.data, '_self');
          setCheckoutLoading(false);
        })
        .finally(() => {
          setCheckoutLoading(false);
        });
  };
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITechnicianActionModel>({ mode: 'onChange', resolver: yupResolver(AddTechnicianActionModelSchema) });

  const resetForm = () => {
    setCount(0);
    setTotalPrice(0);
    reset({
      action: { label: '', value: 0 },
      sourceCost: { label: '', value: 0 },
      count: 0,
      serviceTypeId: { label: '', value: 0 },
      description: '',
    });
    setPrice(undefined);
  };
  const onSubmit = (data: ITechnicianActionModel) => {
    setLoading(true);
    const body = {
      id: state.requestDetailId,
      technicianId: technicianId,
      price: data.price,
      action: data.action?.value,
      sourceCost: data.sourceCost.value,
      count: data.count,
      serviceTypeId: data.serviceTypeId.value,
      userId: technicianId,
      // discountAmount: data.discountAmount,
      description: data.description,
    };

    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_REQUEST_DETAIL_ACTION}`, body)
        .then((result) => {
          resetForm();
          toast.showSuccess(result.data.message);
          GetInvoiceAction();
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    GetInvoiceAction();
    GetSourceCost();
    GetServiceType();
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
          setConfirmRemoveModalVisible(false);
        }}
      ></div>
      <div id="page" className="technician-mission-page">
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
        <Form className="cart-box" onSubmit={handleSubmit(onSubmit)}>
          <div className=" d-flex justify-content-evenly">
            <div className="half-width">
              <Controller
                name="serviceTypeId"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      isClearable
                      isLoading={loading}
                      id="form1a"
                      options={serviceTypes}
                      className="select-city select-width-action m-2"
                      placeholder={'نوع خدمت'}
                      {...field}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setServiceTitle(null);
                        e.value && GetServiceTitle(e?.value);
                      }}
                    />
                    <FormFeedback className="d-block">{errors?.serviceTypeId?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <div className="half-width">
              <Controller
                name="action"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      isClearable
                      isLoading={loading}
                      id="form1a"
                      options={serviceTitle}
                      className="select-city select-width-action m-2"
                      placeholder={'گروه خدمات'}
                      {...field}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setPrice(e.price);
                      }}
                    />
                    <FormFeedback className="d-block">{errors?.action?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          <div className="m-3">
            <div className={`input-style has-borders no-icon mb-4 ${input.introductionCode ? 'input-style-active' : ''}`}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ description: true })}
                      style={{ backgroundPosition: 'left' }}
                      className="form-control validate-text"
                      type="textarea"
                      placeholder={'شرح اقدام'}
                      autoComplete="off"
                      invalid={errors?.description && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {'شرح اقدام'}
                    </label>
                    <i className={`fa fa-times disabled  color-red-dark ${input.introductionCode ? 'disabled' : ''}`} />
                    <em className={`${input.introductionCode ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors?.description?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          <div className="d-flex m-3">
            <div className="w-50">
              <Controller
                name="sourceCost"
                control={control}
                defaultValue={{ label: 'مشتری', value: 0 }}
                render={({ field }) => (
                  <>
                    <Select
                      isClearable
                      isLoading={loading}
                      id="form1a"
                      options={sourceCost}
                      className="select-city select-width-action m-2"
                      placeholder={'منبع هزینه'}
                      {...field}
                    />
                    <FormFeedback className="d-block">{errors?.sourceCost?.value?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <div
              style={{ marginRight: '15px' }}
              className={`input-style has-borders no-icon  mb-4 w-25 ${input.count ? 'input-style-active' : ''}`}
            >
              <Controller
                name="count"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ count: true })}
                      style={{ backgroundPosition: 'left' }}
                      className="form-control validate-text"
                      type="number"
                      placeholder={'تعداد'}
                      autoComplete="off"
                      invalid={errors?.count && true}
                      {...field}
                      onChange={(e: any) => {
                        e.target.value
                          ? (field.onChange(e), setTotalPrice(e.target.value * price), setCount(e.target.value))
                          : setCount(0);
                      }}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {'تعداد'}
                    </label>
                    <i className={`fa fa-times disabled  color-red-dark ${input.count ? 'disabled' : ''}`} />
                    <em className={`${input.count ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors?.count?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <div
              style={{ marginRight: '15px' }}
              className={`input-style has-borders no-icon  mb-4 w-25 ${input.price ? 'input-style-active' : ''}`}
            >
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ price: true })}
                      style={{ backgroundPosition: 'left' }}
                      className="form-control validate-text"
                      type="number"
                      placeholder={UtilsHelper.threeDigitSeparator(price)}
                      autoComplete="off"
                      invalid={errors?.price && true}
                      {...field}
                      onChange={(e: any) => {
                        e.target.value
                          ? (field.onChange(e), setTotalPrice(e.target.value * count), setPrice(e.target.value))
                          : setPrice(0);
                      }}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {'قیمت'}
                    </label>
                    <i className={`fa fa-times disabled  color-red-dark ${input.price ? 'disabled' : ''}`} />
                    <em className={`${input.price ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors?.price?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
          </div>
          <div className="d-flex m-3" style={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
            <div>
              <label className="m-2 select-width-action">قیمت کل</label>
              <label className="m-2 select-width-action">{UtilsHelper.threeDigitSeparator(totalPrice)}</label>
            </div>
            <div>{Num2persian(Number(totalPrice) / 10)} تومان</div>
            {/* <div>
              <label>کد تخفیف</label>
              <Input
                style={{ width: '150px' }}
                className="m-2 p-3"
                name="discount"
                type="text"
                readOnly
                defaultValue={0}
                placeholder="تخفیف"
              />
            </div> */}
            {/* <div>
              <label className="m-2 select-width-action">مالیات</label>
              <label className="m-2 select-width-action">
                {UtilsHelper.threeDigitSeparator((parseInt(totalPrice.toString()) * 9) / 100)}
              </label>
            </div> */}
          </div>
          <div className="d-flex " style={{ justifyContent: 'space-around' }}>
            <Button type="submit" style={{ width: '90%', height: '50px' }} className="btn btn-info m-2">
              {loading ? <Spinner /> : '+ افزودن'}
            </Button>
          </div>
        </Form>
      </div>
      {/* invoice */}
      <div
        className=""
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="area-1 m-3">
          <div className="m-2" style={{ alignItems: 'inherit' }}>
            <i className="fa fa-list"></i>
            <h5 className="m-1">شرح اقدامات</h5>
          </div>
          <div className="">
            {invoice &&
              invoice.length &&
              invoice.map((invoice: IInvoiceActionResultModel, index: number) => {
                return (
                  <div className="justify-content-between ">
                    <div className="flex-column" style={{ width: '50%' }}>
                      <div>
                        {/* {index + 1}- {invoice.serviceTypeTitle} /{invoice.productName} */}
                        {index + 1}- {invoice.serviceTypeTitle}
                        <i className="fa-solid fa-circle-info m-1" style={{ color: 'red' }} id={`registerTip${index}`}></i>
                      </div>
                      <div>{invoice.actionTitle}</div>
                      <UncontrolledTooltip placement="top" target={`registerTip${index}`}>
                        {invoice.description}
                      </UncontrolledTooltip>
                    </div>
                    <div className={invoice.discount ? 'discount' : ''}>{UtilsHelper.threeDigitSeparator(invoice.price)}</div>
                    {invoice.discount ? (
                      <div className="p-1">{UtilsHelper.threeDigitSeparator(invoice.priceAfterDiscount)}</div>
                    ) : (
                      ''
                    )}
                    <div>{invoice.settlementStatus ? <i className="fa fa-check" /> : <i className="fa fa-hourglass" />}</div>
                    <div className="payment-status">
                      {invoice.settlementStatus ? (
                        <div style={{ marginLeft: '60px' }}>{invoice.paymentType}</div>
                      ) : invoice.costSource == 1 ? (
                        <div style={{ marginLeft: '60px' }}>{ECostSource[invoice.costSource]}</div>
                      ) : (
                        <>
                          <Button
                            className="btn btn-success"
                            onClick={() => {
                              Checkout(invoice.paymentId, invoice.priceAfterDiscount);
                            }}
                          >
                            {checkoutLoading ? <Spinner /> : 'نقدی'}
                          </Button>
                          {/* <Button
                            className="btn btn-success"
                            onClick={() => {
                              CheckoutOnline(invoice.paymentId, invoice.priceAfterDiscount);
                            }}
                          >
                            {checkoutLoading ? <Spinner /> : 'آنلاین'}
                          </Button> */}
                          {/* <UncontrolledDropdown>
                            <DropdownToggle caret>پرداخت</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  Checkout(invoice.paymentId, invoice.priceAfterDiscount);
                                }}
                              >
                                {checkoutLoading ? <Spinner /> : 'نقدی'}
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  CheckoutOnline(invoice.paymentId, invoice.priceAfterDiscount);
                                }}
                              >
                                {checkoutLoading ? <Spinner /> : 'آنلاین'}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown> */}
                          {/* <RWebShare
                            data={{
                              text: `لینک پرداخت هزینه بابت ${invoice.actionTitle} `,
                              url: `${invoice.paymentUrl}`,
                              title: 'کاردون',
                            }}
                          > */}
                          <i className="fa-sharp fa-solid fa-share-nodes" style={{ marginRight: '10px' }} />
                          {/* </RWebShare> */}
                        </>
                      )}
                      <div>
                        {invoice.settlementStatus ? (
                          ''
                        ) : (
                          <div
                            style={{ marginLeft: '10px', cursor: 'pointer', marginRight: '5px' }}
                            onClick={() => {
                              setPaymentId(invoice.paymentId);
                              setConfirmRemoveModalVisible(true);
                              setBackgroundDimmer(true);
                            }}
                            className="fa fa-times color-red-dark"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <Button
              onClick={() => navigate(URL_TECHNICIAN_FACTOR)}
              className="btn btn-m btn-full mb-3 rounded-xs text-uppercase font-700 shadow-s border-blue-dark bg-blue-light"
            >
              {checkoutLoading ? (
                <Spinner />
              ) : (
                <>
                  مشاهده فاکتور<span className="fa-fw select-all fas"></span>
                </>
              )}
            </Button> */}
          </div>
        </div>
      </div>
      <RemoveConfirmModal
        confirmModalVisible={confirmRemoveModalVisible}
        accept={() => {
          setConfirmRemoveModalVisible(false), setBackgroundDimmer(false), RemoveAction(paymentId!);
        }}
        reject={() => {
          setConfirmRemoveModalVisible(false), setBackgroundDimmer(false);
        }}
      />
    </>
  );
};

export default Action;
