import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { customFunction } from '../city/template';
import { resultCode } from './ResCode';
import { Spinner } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ICallBackDetailsResultModel } from '@src/models/output/callback/ICallBackDetailsResultModel';
import { APIURL_GET_CALLBACK_DETAIL } from '@src/configs/apiConfig/apiUrls';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { DateHelper } from './../../utils/dateHelper';
import { UtilsHelper } from '@src/utils/GeneralHelpers';

interface CallBackUrl {}

const CallBackUrl: FunctionComponent<CallBackUrl> = () => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const httpRequest = useHttpRequest();
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [callBack, setCallBack] = useState<ICallBackDetailsResultModel>();
  const search = useLocation().search;
  const [timer, setTimer] = useState<boolean>(true);
  const resCode = new URLSearchParams(search).get('ResCode');
  // const refId = new URLSearchParams(search).get('RefId');
  const paymentId = new URLSearchParams(search).get('SaleOrderId');
  const URL = new URLSearchParams(search).get('DestinationUrl');

  const ShowDetailPayment = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<ICallBackDetailsResultModel>>(
        `${APIURL_GET_CALLBACK_DETAIL}?PaymentId=${paymentId}&PayertId=${userData?.userId}`
      )
      .then((result) => {
        setCallBack(result.data.data);
        setTimer(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (remainingTimeSeconds > 0 && timer) {
      setTimeout(() => {
        setRemainingTimeSeconds(remainingTimeSeconds - 1);
      }, 1000);
    }
    remainingTimeSeconds == 0 && window.open(URL!, '_self');
  }, [remainingTimeSeconds]);
  return (
    <>
      {resCode && resCode == '0' ? (
        <div className="card card-style preload-img" style={{ marginTop: '20px' }}>
          <div className="card-body text-center">
            <p className="color-white pt-4">پرداخت موفق</p>
            <h2 className="color-white mt-n2 mb-3 pb-1">{resultCode[resCode]}</h2>
            <p className="boxed-text-xl color-white opacity-80 pb-2">
              در صورتی که بصورت خودکار به صفحه پرداخت منتقل نشده اید روی دکمه زیر کلیک نمایید
            </p>
            {
              <>
                <h2>در حال بازگشت به صفحه پرداخت... </h2>
                <h2>{remainingTimeSeconds}</h2>
              </>
            }
            <a
              onClick={() => {
                window.open(URL!, '_self');
              }}
              style={{ cursor: 'pointer' }}
              className="btn btn-m rounded-sm btn-border btn-center-l border-white color-white font-700 text-uppercase mb-4"
            >
              بازگشت به صفحه پرداخت
            </a>
            {timer && (
              <a
                onClick={() => {
                  ShowDetailPayment();
                }}
                style={{ cursor: 'pointer' }}
                className="btn btn-m rounded-sm btn-border btn-center-l border-white color-white font-700 text-uppercase mb-4"
              >
                {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'مشاهده جزییات تراکنش'}
              </a>
            )}
          </div>
          <div className="card-overlay bg-highlight opacity-95"></div>
        </div>
      ) : (
        <div className="card card-style preload-img" style={{ marginTop: '20px' }}>
          <div className="card-body text-center">
            <p className="color-white pt-4">پرداخت ناموفق</p>
            <h2 className="color-white mt-n2 mb-3 pb-1">
              {
                //@ts-ignore
                resultCode[resCode]
              }
            </h2>
            <p className="boxed-text-xl color-white opacity-80 pb-2">
              چنانچه مبلغ از حساب شما کسر شده ، ظرف 24 ساعت آینده ، مبلغ کسر شده واریز خواهد شد.
            </p>
            {
              <>
                <h2>در حال بازگشت به صفحه پرداخت... </h2>
                <h2>{remainingTimeSeconds}</h2>
              </>
            }
            <a
              onClick={() => {
                window.open(URL!, '_self');
              }}
              style={{ cursor: 'pointer' }}
              className="btn btn-m rounded-sm btn-border btn-center-l border-white color-white font-700 text-uppercase mb-4"
            >
              بازگشت به صفحه پرداخت
            </a>
            {timer && (
              <a
                onClick={() => {
                  ShowDetailPayment();
                }}
                style={{ cursor: 'pointer' }}
                className="btn btn-m rounded-sm btn-border btn-center-l border-white color-white font-700 text-uppercase mb-4"
              >
                {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'مشاهده جزییات تراکنش'}
              </a>
            )}
          </div>
          <div className="card-overlay bg-red-light opacity-95"></div>
        </div>
      )}
      {/* payment Detail */}
      {!timer && (
        <div className="card card-style p-2">
          <div className="content mb-2">
            <h4>مشاهده جزییات تراکنش</h4>
            <p>با کلید بر روی بازگشت به صفحه پرداخت ، به صفحه قبلی پیش از پرداخت انتقال داده خواهید شد.</p>
            <table className="table table-borderless text-center rounded-sm shadow-l" style={{ overflow: 'hidden' }}>
              <thead>
                <tr className="bg-gray-dark">
                  <th scope="col" className="color-theme py-3 font-14">
                    عنوان
                  </th>
                  <th scope="col" className="color-theme py-3 font-14">
                    شرح جزییات
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">پرداخت کننده</th>
                  <td className="color-green-dark">
                    {userData?.profile.firstName} {userData?.profile.lastName}
                  </td>
                </tr>
                <tr>
                  <th scope="row">مبلغ پرداخت</th>
                  <td className="color-green-dark">{UtilsHelper.threeDigitSeparator(callBack?.amount)} ریال</td>
                </tr>
                <tr>
                  <th scope="row">تاریخ و زمان</th>
                  <td className="color-yellow-dark">
                    {DateHelper.isoDateTopersian(callBack?.dateTime) +
                      'ساعت ' +
                      DateHelper.splitTime(callBack?.dateTime ? callBack?.dateTime : '')}
                  </td>
                </tr>
                <tr>
                  <th scope="row">توضیحات</th>
                  <td className="color-green-dark">{callBack?.description}</td>
                </tr>
                <tr>
                  <th scope="row">آی دی پرداخت</th>
                  <td className="color-green-dark">{callBack?.paymentId}</td>
                </tr>
                <tr>
                  <th scope="row">RefId</th>
                  <td className="color-red-dark">{callBack?.refId}</td>
                </tr>
                <tr>
                  <th scope="row">وضعیت</th>
                  <td className="color-red-dark">{callBack?.isSuccess ? 'موفق آمیز' : 'ناموفق'}</td>
                </tr>
                <tr>
                  <th scope="row">کد وضعیت</th>
                  <td className="color-red-dark">{callBack?.resCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CallBackUrl;
