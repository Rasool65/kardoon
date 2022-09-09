import {
  APIURL_GET_CURRENT_CONSUMER_REQUEST,
  APIURL_GET_PREVIOUS_CONSUMER_REQUEST,
  APIURL_GET_SERVICES,
} from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import PrevHeader from '@src/layout/PrevHeader';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IEStatusId, IOrderListResultModel, IOrderRequestDetail } from '@src/models/output/order/IOrderListResultModel';
import { RootStateType } from '@src/redux/Store';
import { DateHelper } from '@src/utils/dateHelper';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '../../configs/urls';
import { init_template } from './template';

const Order: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const [orderList, setOrderList] = useState<any>([]);
  const userId = useSelector((state: RootStateType) => state.authentication.userData?.userId);
  const [loading, setLoading] = useState<boolean>(false);

  const GetCurrentOrders = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IOrderListResultModel[]>>(`${APIURL_GET_CURRENT_CONSUMER_REQUEST}?UserId=${userId}`)
      .then((result) => {
        setOrderList(result.data.data);
        setLoading(false);
      });
  };
  const GetPreviousOrders = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IOrderListResultModel[]>>(`${APIURL_GET_PREVIOUS_CONSUMER_REQUEST}?UserId=${userId}`)
      .then((result) => {
        setOrderList(result.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    init_template();
    GetCurrentOrders();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <div id="page">
      <div className="page-content">
        <PrevHeader />
        <Footer footerMenuVisible={true} activePage={1} />
        <div
          style={{
            marginTop: '110px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button className="btn btn-success mb-5" onClick={GetCurrentOrders}>
            سفارشات جاری
          </button>
          <button className="btn btn-success mb-5 float-end" onClick={GetPreviousOrders}>
            سفارشات قبلی
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
            <Spinner style={{ width: '5rem', height: '5rem' }} />
          </div>
        ) : (
          orderList &&
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
                    <Button
                      onClick={() => navigate(`${URL_ORDER_DETAIL}?id=${requests.requestNumber}`)}
                      style={{ width: 'inherit' }}
                    >
                      جزئیات بیشتر
                    </Button>
                  </div>
                </div>
              </>
            );
          })
        )}

        {/* End loop */}
      </div>
    </div>
  );
};

export default Order;
