import { APIURL_LOGIN, APIURL_SEND_PASSWORD } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IForgetPasswordResultModel } from '@src/models/output/authentication/IForgetPasswordResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { GeneralHelpers } from '@src/utils/GeneralHelpers';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { IModalModel } from './ModalModel';
import PinField from 'react-pin-field';
import { useToast } from '@src/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { URL_USER_PROFILE } from '@src/configs/urls';
import { useTranslation } from 'react-i18next';

const EnterCode: FunctionComponent<IModalModel> = ({ showEnterCodeModal, mobileNumber, handleEditMobileNo }) => {
  const toast = useToast();
  const { t }: any = useTranslation();
  const Ref1 = useRef(null);
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(30);
  const httpRequest = useHttpRequest();
  const [timer, setTimer] = useState<boolean>(true);
  const [pinLoading, setPinLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Resent = () => {
    if (!timer) {
      httpRequest
        .postRequest<IOutputResult<IForgetPasswordResultModel>>(APIURL_SEND_PASSWORD, { mobileNumber: mobileNumber })
        .then((result) => {
          setTimer(true);
          toast.showSuccess(result.data.message);
          // setRemainingTimeSeconds(result.data.data.remainingTimeSeconds);
          setRemainingTimeSeconds(30);
        });
    }
  };

  const LoginWithSMS = (e: string) => {
    setPinLoading(true);
    const body = {
      ClientId: 'Kardoon_Technician',
      ClientSecret: 'p@ssword@123',
      UserName: mobileNumber,
      Password: e,
    };
    httpRequest
      .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, body)
      .then((result) => {
        dispatch(handleLogin(result));
        navigate(URL_USER_PROFILE);
        toast.showSuccess(result.data.message);
        setPinLoading(false);
      })
      .finally(() => {
        setPinLoading(false);
      });
  };

  useEffect(() => {
    if (remainingTimeSeconds > 0) {
      const timer = setTimeout(() => {
        setRemainingTimeSeconds(remainingTimeSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimer(false);
    }
  });

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
          <div className="divider" style={{ marginTop: '15px', marginBottom: '15px' }} />
          <div style={{ direction: 'ltr', alignSelf: 'center' }}>
            {pinLoading ? (
              <Spinner style={{ width: '1rem', height: '1rem' }} />
            ) : (
              <PinField
                className="pin-field"
                style={{ height: '55px' }}
                length={6}
                validate={/^[0-9]$/}
                onComplete={(e) => LoginWithSMS(e)}
              />
            )}
          </div>
          <div className="divider" style={{ marginTop: '15px', marginBottom: '15px' }} />
          <Button onClick={Resent} className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0">
            {remainingTimeSeconds > 0 ? `${t('PleaseWait')}(${remainingTimeSeconds})` : t('Resent')}
          </Button>
          <div className="color-theme pointer" style={{ marginTop: '25px' }} onClick={handleEditMobileNo}>
            {t('EditMobileNumber')}
          </div>
        </div>
      </div>
    </>
  );
};
export default EnterCode;
