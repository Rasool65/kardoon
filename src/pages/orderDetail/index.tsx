import Form, { AjvError, IChangeEvent, ISubmitEvent, UiSchema } from '@rjsf/core';
import {
  APIURL_GET_MISSION_ATTRIBUTES_DETAILS,
  APIURL_GET_ORDER_DETAILS,
  APIURL_POST_INVOICE_CHECKOUT,
  APIURL_POST_INVOICE_CHECKOUT_ALL,
} from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import Footer from '@src/layout/Footer';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IEStatusId } from '@src/models/output/order/IOrderListResultModel';
import {
  IInvoice,
  IOrderDetailListResultModel,
  IProblemList,
  IDetails,
  ITechnicians,
} from '@src/models/output/orderDetail/IOrderDetailListResultModel';
import { RootStateType } from '@src/redux/Store';
import { CustomFunctions } from '@src/utils/custom';
import { DateHelper } from '@src/utils/dateHelper';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_MY_ORDERS } from '../../configs/urls';
import { IAttributesResultModel } from '@src/models/output/missionDetail/IAttributesResultModel';
import { useToast } from '@src/hooks/useToast';

const OrderDetail: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const httpRequest = useHttpRequest();
  const [orderDetailList, setOrderDetailList] = useState<IOrderDetailListResultModel>();
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formloading, setFormLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [genForm, setGenForm] = useState<IAttributesResultModel>();
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const [checkoutAllLoading, setCheckoutAllLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const toast = useToast();
  const uiSchema = {
    'ui:readonly': true,
    // 'ui:widget': 'checkboxes',
  };

  const GetOrderDetailList = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IOrderDetailListResultModel>>(
        `${APIURL_GET_ORDER_DETAILS}?RequestNumber=${id}&UserId=${userData?.userId}`
      )
      .then((result) => {
        setOrderDetailList(result.data.data);
        setLoading(false);
      });
  };

  const FormGenDetail = (requestDetailId: number) => {
    setFormLoading(true);
    httpRequest
      .getRequest<IOutputResult<IAttributesResultModel>>(
        `${APIURL_GET_MISSION_ATTRIBUTES_DETAILS}?RequestDetailId=${requestDetailId}&UserId=${userData?.userId}`
      )
      .then((result) => {
        setGenForm(result.data.data);
        setFormLoading(false);
      });
  };
  const Checkout = (paymentId: number, consumerPaymentAmount: number) => {
    const body = {
      paymentId: paymentId,
      userId: userData?.userId,
      consumerPaymentAmount: consumerPaymentAmount,
    };
    setCheckoutLoading(true);
    !loading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_INVOICE_CHECKOUT}`, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          GetOrderDetailList();
          setCheckoutLoading(false);
        })
        .finally(() => {
          setCheckoutLoading(false);
        });
  };
  const CheckoutAll = (requestNumber: string) => {
    setCheckoutAllLoading(true);
    const body = {
      userId: userData?.userId,
      requestNumber: requestNumber,
    };
    !checkoutAllLoading &&
      httpRequest
        .postRequest<IOutputResult<any>>(`${APIURL_POST_INVOICE_CHECKOUT_ALL}`, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          GetOrderDetailList();
          setCheckoutAllLoading(false);
        })
        .finally(() => {
          setCheckoutAllLoading(false);
        });
  };

  useEffect(() => {
    CustomFunctions();
    GetOrderDetailList();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
      <div id="page">
        <Footer footerMenuVisible={true} activePage={1} />
        <div className="page-content">
          <div className="page-title page-title-small">
            <h2>
              <a href="#" onClick={() => navigate(URL_MY_ORDERS)}>
                <i className="fa fa-arrow-right mx-2"></i>
                بازگشت
              </a>
            </h2>
            {/* <a
              href="#"
              data-menu="menu-main"
              className="bg-fade-highlight-light shadow-xl preload-img"
              data-src="images/avatars/5s.png"
            ></a> */}
          </div>
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>
          {loading ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
                <Spinner style={{ width: '5rem', height: '5rem' }} />
              </div>
            </>
          ) : (
            <>
              <div className="card card-style header-order">
                <div className="card-body">
                  <div className="">
                    <div className=" col-6">شماره درخواست:</div>
                    <div className=" col-6 justify-content-end">{orderDetailList?.requestNumber}</div>
                  </div>
                  <div className="">
                    <div className=" col-6">{orderDetailList?.address}</div>
                    <div className=" col-6 justify-content-end">
                      {DateHelper.isoDateTopersian(orderDetailList?.presenceTime)}-{orderDetailList?.shiftTitle}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-style">
                <div className="accordion mt-4" id="accordion-2">
                  {orderDetailList?.details &&
                    orderDetailList.details.length > 0 &&
                    orderDetailList.details.map((orderDetail: IDetails, index: number) => {
                      return (
                        <>
                          <div className="card card-style shadow-0 bg-highlight mb-1">
                            <button
                              onClick={() => {
                                FormGenDetail(orderDetail.id!);
                              }}
                              className="btn custom-accordion-btn accordion-btn color-white no-effect"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${orderDetail.id}`}
                            >
                              <div>
                                <div className=" col-6">
                                  {index + 1}-{orderDetail.requestDescription}
                                </div>
                                <div className=" col-5">
                                  <span className={IEStatusId[orderDetail.statusId!]}>{orderDetail.statusTitle}</span>
                                </div>
                                <div className=" col-1">
                                  <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                                </div>
                              </div>
                            </button>
                            <div
                              style={{ backgroundColor: 'white' }}
                              id={`collapse${orderDetail.id}`}
                              className="collapse bg-theme custom-accordion-open"
                              data-bs-parent="#accordion-2"
                            >
                              <div>
                                <div style={{ color: 'rgb(97, 97, 97)' }}>
                                  {formloading ? (
                                    <Spinner type="grow" style={{ backgroundColor: '#198754' }} children={true} />
                                  ) : (
                                    genForm && (
                                      <Form
                                        children={true}
                                        schema={genForm.attributes}
                                        formData={genForm.attributeValues}
                                        uiSchema={uiSchema}
                                      />
                                    )
                                  )}
                                </div>
                                <div>
                                  <div>
                                    <p style={{ marginBottom: '0' }}>علت درخواست:</p>
                                  </div>
                                  <div>
                                    <ul>
                                      {orderDetail.problems &&
                                        orderDetail.problems.length > 0 &&
                                        orderDetail.problems.map((problems: IProblemList, index: number) => {
                                          return <li>{problems.label}</li>;
                                        })}
                                    </ul>
                                  </div>
                                  <div>
                                    <audio src={orderDetail.voiceMessageUrl} controls />
                                  </div>
                                  <div style={{ display: 'block' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                      <video
                                        width="320"
                                        height="240"
                                        controls
                                        style={{ display: 'flex', alignContent: 'center' }}
                                        src={orderDetail.videoMessageUrl}
                                      />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'inherit', flexWrap: 'wrap' }}>
                                      {orderDetail.imageUrlList &&
                                        orderDetail.imageUrlList.length > 0 &&
                                        orderDetail.imageUrlList.map((imageAddress: string, index: number) => {
                                          return (
                                            <img
                                              style={{ maxWidth: '85px', cursor: 'pointer' }}
                                              className="m-2"
                                              onClick={() => {
                                                setImageUrl(imageAddress);
                                                setImageModalVisible(true);
                                              }}
                                              src={imageAddress}
                                            />
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <p>نام تکنسین:</p>
                                  </div>
                                  {orderDetail.technicians &&
                                    orderDetail.technicians.length &&
                                    orderDetail.technicians.map((technician: ITechnicians, index: number) => {
                                      return (
                                        <div>
                                          <div className="col-6">
                                            <p>
                                              {index + 1}- {technician.name}
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <i
                                              className="fa fa-phone"
                                              onClick={() => window.open(`tel:${technician.mobileNumber}`)}
                                            ></i>
                                            <i
                                              className="fa fa-message"
                                              onClick={() => window.open(`sms:${technician.mobileNumber}`)}
                                            ></i>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              {/* invoice */}
              <div
                className="card "
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
                    {orderDetailList?.invoice &&
                      orderDetailList.invoice.length &&
                      orderDetailList.invoice.map((invoice: IInvoice, index: number) => {
                        return (
                          <div className="justify-content-evenly">
                            <div>
                              {index + 1}- {invoice.serviceTypeTitle} {invoice.productName}
                            </div>
                            <div className={invoice.discount ? 'discount' : ''}>
                              {UtilsHelper.threeDigitSeparator(invoice.price)}
                            </div>
                            {invoice.discount ? (
                              <div className="p-1">{UtilsHelper.threeDigitSeparator(invoice.priceAfterDiscount)}</div>
                            ) : (
                              ''
                            )}
                            <div>
                              {invoice.settlementStatus ? <i className="fa fa-check" /> : <i className="fa fa-hourglass" />}
                            </div>
                            <div>
                              {invoice.settlementStatus ? (
                                invoice.status
                              ) : !invoice.settlementStatus ? (
                                <Button
                                  onClick={() => {
                                    Checkout(invoice.paymentId, invoice.priceAfterDiscount!);
                                  }}
                                  className="btn btn-success"
                                  style={{ fontSize: 'inherit' }}
                                >
                                  {checkoutLoading ? <Spinner /> : 'پرداخت'}
                                </Button>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <section className="box4">
                  <Button
                    onClick={() => CheckoutAll(orderDetailList?.requestNumber!)}
                    className="btn btn-m btn-full mb-3 rounded-xs text-uppercase font-700 shadow-s border-blue-dark bg-blue-light"
                  >
                    {checkoutAllLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        تسویه حساب <span className="fa-fw select-all fas"></span>
                      </>
                    )}
                  </Button>
                </section>
              </div>
            </>
          )}
        </div>

        <div
          className={`menu menu-box-modal rounded-m ${imageModalVisible ? 'menu-active' : ''}`}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundRepeat: 'round',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
          data-menu-height="cover"
          data-menu-width="cover"
          onClick={() => setImageModalVisible(false)}
        />
      </div>
    </>
  );
};

export default OrderDetail;
