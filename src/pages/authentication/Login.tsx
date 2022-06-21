import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { Alert, Button, Col, Container, Form, FormFeedback, Input, Row, Spinner } from 'reactstrap';
import { ILoginModel, LoginModelSchema } from '@src/models/input/authentication/ILoginModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_IDP_TOKEN, APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import { URL_HOME, URL_MAIN, URL_USER_PROFILE } from './../../configs/urls';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import { useToast } from '@src/hooks/useToast';
import FooterCard from '@src/layout/FooterCard';
import Register from './Register';
import PasswordMessage from './PasswordMessage';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import EnterCode from "./EnterCode";

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const tokenAuthentication = useTokenAuthentication();
  const dispatch = useDispatch();
  const { t }: any = useTranslation();
  const toast = useToast();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  const [inputs, setInputs] = useState([{ it: false }, { it: false }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [registerModalVisible, setRegisterModalVisible] = useState<boolean>(false);
  const [forgetPasswordModalVisible, setForgetPasswordModalVisible] = useState<boolean>(false);
  const [enterCodeModalVisible, setEnterCodeModalVisible] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  //todo <button onClick={() => i18n.changeLanguage('fa')}>changeLanguage</button>  */

  const onSubmit = (data: ILoginModel) => {
    setLoading(true);
    const body = {
      ClientId: 'Kardoon_Technician',
      ClientSecret: 'p@ssword@123',
      UserName: data.username,
      Password: data.password,
    };
    if (data && !loading) {
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, body)
        .then((result) => {
          dispatch(handleLogin(result));
          navigate(URL_USER_PROFILE);
          toast.showSuccess(result.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleModal = () => {
    setRegisterModalVisible(!registerModalVisible);
  };
  return (
    <>
      <div id="page">
        <div className="page-content" style={{ paddingBottom: '0' }}>
          <div
            // onClick={(e) => this.loginWithoutUsername(e)}
            className="page-title page-title-small pointer"
            style={{ color: '#FFF', width: 'fit-content', fontSize: '16px' }}
          >
            {t('LoginWithoutAccount')}
          </div>

          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95" />
            <div className="card-overlay dark-mode-tint" />
            <div className="card-bg bg-20" />
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="card card-style p-2">
              <div className="content mt-2 mb-0">
                <div className="input-style no-borders has-icon validate-field mb-4">
                  {/* <input type="name" className="form-control validate-name" id="form1a" placeholder="نام" />
            <label className="color-blue-dark font-10 mt-1">{t('UserName')}</label> */}
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }:any) => (
                      <>
                        <i className="fa fa-user" style={{ marginTop: '15px', top: '0' }} />
                        <Input
                          id="form1a"
                          style={{ backgroundPosition: 'left' }}
                          className="form-control validate-name"
                          autoFocus
                          type="text"
                          placeholder={t('EnterMobile')}
                          autoComplete="off"
                          invalid={errors.username && true}
                          {...field}
                        />
                        {/* <label htmlFor="form4" className="color-highlight">
                          {t('UserName')}
                        </label> */}
                        <FormFeedback>{errors.username?.message}</FormFeedback>
                      </>
                    )}
                  />
                  {/*<i className="fa fa-times disabled invalid color-red-dark"></i>*/}
                  {/*<i className="fa fa-check disabled valid color-green-dark"></i>*/}
                  <em>({t('Required')})</em>
                </div>
                <div className="input-style no-borders has-icon validate-field mb-4">
                  {/* <input type="password" className="form-control validate-password" id="form3a" placeholder="رمز عبور" />
            <label className="color-blue-dark font-10 mt-1">رمز عبور</label> */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }:any) => (
                      <>
                        <i className="fa fa-lock" style={{ marginTop: '15px', top: '0' }} />
                        <Input
                          className="form-control validate-password"
                          style={{ backgroundPosition: 'left' }}
                          autoFocus
                          type="password"
                          placeholder={t('EnterPassword')}
                          autoComplete="off"
                          invalid={errors.password && true}
                          {...field}
                        />
                        <FormFeedback>{errors.password?.message}</FormFeedback>
                      </>
                    )}
                  />
                  {/*<i className="fa fa-times disabled invalid color-red-dark"></i>*/}
                  {/*<i className="fa fa-check disabled valid color-green-dark"></i>*/}
                  <em>({t('Required')})</em>
                </div>
                <Button
                  style={{ width: '100%', marginTop: '30px' }}
                  type="submit"
                  className="btn btn-m mt-4 mb-0 btn-full bg-blue-dark rounded-sm text-uppercase font-900"
                >
                  {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('Login')}
                </Button>

                <div
                  className="color-theme pointer"
                  style={{ marginTop: '15px', maxWidth: 'fit-content' }}
                  onClick={() => setRegisterModalVisible(!registerModalVisible)}
                >
                  {t('Register')}
                </div>
                <div
                  className="color-theme pointer"
                  style={{ marginTop: '5px', maxWidth: 'fit-content' }}
                  onClick={() => setForgetPasswordModalVisible(!forgetPasswordModalVisible)}
                >
                  {t('LoginWithSMS')}
                </div>
                <div className="divider mt-4 mb-3" />
                <div className="footer-title pointer" style={{ fontSize: '14px' }}>
                  {t('TermsAndConditions')}
                </div>
              </div>
            </div>
          </Form>
          <FooterCard footerMenuVisible={false}/>
        </div>

        <Register showRegisterModal={registerModalVisible} handleRegisterModal={handleModal} />
        <PasswordMessage showForgetPasswordModal={forgetPasswordModalVisible} setForgetPasswordModalVisible={setForgetPasswordModalVisible} />


        {/* <EnterCodeModal
          enterCodeModalVisible={this.state.enterCodeModalVisible}
          mobileNumber={this.state.mobileNumber}
          editMobileNo={(e) => this.editMobileNo(e)}
          resend={(e) => this.resend(e)}
        /> */}
      </div>
      <div
        onClick={() => {
          setForgetPasswordModalVisible(false);
          setRegisterModalVisible(false);
          setEnterCodeModalVisible(false);
        }}
        className={registerModalVisible || forgetPasswordModalVisible ? 'menu-hider menu-active' : ''}
      />
    </>
  );
};

export default Login;
