import useHttpRequest from '@src/hooks/useHttpRequest';
import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IEStatusId, IOrderListResultModel, IOrderRequestDetail } from '@src/models/output/order/IOrderListResultModel';
import { CustomFunctions } from '@src/utils/custom';
import { DateHelper } from '@src/utils/dateHelper';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '../../configs/urls';

const Order: FunctionComponent<IPageProps> = () => {
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const [orderList, setOrderList] = useState<any>([]);

  const GetCurrentOrders = () => {
    // setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IOrderListResultModel[]>>(
        // `${APIURL_GET_SERVICES}?CityId=${cityId}`
        'http://127.0.0.1:2500/GetCurrentOrder'
      )
      .then((result) => {
        setOrderList(result.data.data);
        // setLoading(false);
      });
  };

  useEffect(() => {
    GetCurrentOrders();
    CustomFunctions();
  }, []);
  return (
    <div id="page">
      <div className="page-content">
        <div className="page-title page-title-small">
          <h2>
            <a href="#" data-back-button>
              <i className="fa fa-arrow-right"></i>
            </a>
            بازگشت
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
        <Footer footerMenuVisible={true} activePage={1} />
        <div
          style={{
            marginTop: '110px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button className="btn btn-success mb-5">سفارشات جاری</button>
          <button className="btn btn-success mb-5 float-end">سفارشات قبلی</button>
        </div>
        {orderList &&
          orderList.length > 0 &&
          orderList.map((requests: IOrderListResultModel, index: number) => {
            return (
              <>
                <div className="card card-style shadow-0 bg-highlight mb-1">
                  <button
                    className="btn accordion-btn custom-accordion-btn  color-white no-effect"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                  >
                    <div style={{ marginBottom: '20px' }}>
                      شماره درخواست : <div>{requests.requestNumber}</div>
                      <div style={{ marginRight: 'auto' }}>{DateHelper.isoDateTopersian(requests.presenceTime)}</div>
                      {requests.isUrgent ? (
                        <div style={{ border: '2px solid red', color: 'red', marginRight: '10px' }}>مراجعه فوری</div>
                      ) : (
                        ''
                      )}
                    </div>

                    {requests.requestDetail &&
                      requests.requestDetail.length > 0 &&
                      requests.requestDetail.map((requestDetail: IOrderRequestDetail, index: number) => {
                        return (
                          <div style={{ marginBottom: '5px' }}>
                            <div className="col-6">
                              <div>{index + 1}-</div>
                              {requestDetail.requestDescription}
                            </div>
                            <div className="col-5">
                              {/* <span className="bg-success">{requestDetail.statusTitle}</span> */}
                              <span className={IEStatusId[requestDetail.statusId!]}>{requestDetail.statusTitle}</span>
                            </div>
                          </div>
                        );
                      })}

                    <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                  </button>
                  <div
                    style={{ backgroundColor: 'white' }}
                    id={`collapse${index}`}
                    className="collapse bg-theme custom-accordion-open"
                    data-bs-parent="#accordion-2"
                  >
                    <Button onClick={() => navigate(`${URL_ORDER_DETAIL}?id=${requests.id}`)} style={{ width: 'inherit' }}>
                      جزئیات بیشتر
                    </Button>
                  </div>
                </div>
              </>
            );
          })}

        {/* End loop */}
      </div>
    </div>
  );
};

export default Order;
