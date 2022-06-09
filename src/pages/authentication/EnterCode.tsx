import { APIURL_SEND_PASSWORD } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IForgetPasswordResultModel } from '@src/models/output/authentication/IForgetPasswordResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { GeneralHelpers } from '@src/utils/GeneralHelpers';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Row } from 'reactstrap';
import { IModalModel } from './ModalModel';

const EnterCode: FunctionComponent<IModalModel> = ({ showEnterCodeModal, mobileNumber, editMobileNo }) => {
  const Ref1 = React.useRef(null);
  const [timer, setTimer] = useState<string>('00:00');
  const [resendVisible, setResendVisible] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Resent = () => {
    debugger;
    //todo call API Send SMS
    // httpRequest
    //   .postRequest<IOutputResult<IForgetPasswordResultModel>>(APIURL_SEND_PASSWORD, mobileNumber)
    //   .then((result) => {
    //     debugger;
    //     let a = result.data.message;
    //     // todo timer reset
    //   })
    //   .finally(() => setIsLoading(false));
  };
  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
    } else {
      setResendVisible(true);
      if (Ref1.current) clearInterval(Ref1.current);
    }
  };

  const clearTimer = (e: any) => {
    debugger;
    setTimer('00:59');
    if (Ref1.current) clearInterval(Ref1.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref1.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 59);
    return deadline;
  };

  useEffect(() => {
    if (!showEnterCodeModal) return;
    clearTimer(getDeadTime());
  }, [showEnterCodeModal]);

  const onPinFieldCompleted = (e: any) => {
    // console.log(e)
  };

  return (
    <>
      <div
        className={`menu menu-box-bottom menu-box-detached rounded-m ${showEnterCodeModal ? 'menu-active' : ''}`}
        data-menu-height="310"
        style={{ display: 'inherit', direction: 'rtl' }}
        data-menu-effect="menu-over"
      >
        <div className="card p-4" style={{ marginBottom: '0px' }}>
          کد پیامک شده به شماره موبایل {GeneralHelpers.toPersianNumber(mobileNumber?.toString())} را وارد نمایید.
          <div className="divider" style={{ marginTop: '10px' }} />
          <div style={{ direction: 'rtl', alignSelf: 'center' }}>
            {/* <ReactPinField className="pin-field" validate={/^[0-9]$/} onComplete={(e) => onPinFieldCompleted(e)} /> */}
          </div>
          <div className="divider" style={{ marginTop: '10px' }} />
          <button onClick={Resent} className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0">
            ارسال مجدد ({timer})
          </button>
          <div
            className="color-theme pointer"
            style={{ marginTop: '15px' }}
            // onClick={
            //   (e) => editMobileNo(e)
            // }
          >
            ویرایش شماره موبایل
          </div>
        </div>
      </div>
    </>
  );
};
export default EnterCode;
