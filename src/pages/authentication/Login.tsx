import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { Button, Col, Container, Form, FormFeedback, Input, Row, Spinner } from 'reactstrap';
import { ILoginModel, LoginModelSchema } from '@src/models/input/authentication/ILoginModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_LOGIN, APIURL_TOKEN } from '@src/configs/apiConfig/apiUrls';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import { URL_HOME, URL_MAIN } from './../../configs/urls';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';

import FooterCard from '@src/layout/FooterCard';

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const tokenAuthentication = useTokenAuthentication();
  const dispatch = useDispatch();
  const { i18n, t }: any = useTranslation();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  //todo <button onClick={() => i18n.changeLanguage('fa')}>changeLanguage</button>  */

  const onSubmit = (data: ILoginModel) => {
    if (data && !isLoading) {
      navigate(URL_MAIN);
      // setIsLoading(true);
      // const body = {
      //   ClientId: 'Kardoon_Technician',
      //   ClientSecret: 'p@ssword@123',
      //   UserName: data.username,
      //   Password: data.password,
      // };

      // httpRequest
      //   .postRequest<IOutputResult<ILoginResultModel>>(APIURL_TOKEN, body)
      //   .then((result) => {
      //     dispatch(
      //       handleLogin({
      //         token: result.data.data.access_token,
      //         refreshToken: result.data.data.refresh_token,
      //         username: data.username,
      //       })
      //     );
      //     navigate('/home');
      //   })
      //   .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <div id="page">
        <div className="page-content" style={{ direction: 'rtl' }}>
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

          <div className="card card-style p-2">
            <div className="content mt-2 mb-0">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-style no-borders has-icon validate-field mb-4">
                  <i className="fa fa-user"></i>
                  {/* <input type="name" className="form-control validate-name" id="form1a" placeholder="نام" />
            <label className="color-blue-dark font-10 mt-1">{t('UserName')}</label> */}
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="form1a"
                          className="form-control validate-name"
                          autoFocus
                          type="text"
                          placeholder={t('EnterMobile')}
                          autoComplete="off"
                          invalid={errors.username && true}
                          {...field}
                        />
                        <FormFeedback>{errors.username?.message}</FormFeedback>
                      </>
                    )}
                  />
                  <i className="fa fa-times disabled invalid color-red-dark"></i>
                  <i className="fa fa-check disabled valid color-green-dark"></i>
                  <em>(اجباری)</em>
                </div>
                <div className="input-style no-borders has-icon validate-field mb-4">
                  <i className="fa fa-lock"></i>
                  {/* <input type="password" className="form-control validate-password" id="form3a" placeholder="رمز عبور" />
            <label className="color-blue-dark font-10 mt-1">رمز عبور</label> */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          className="form-control validate-password"
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
                  <i className="fa fa-times disabled invalid color-red-dark"></i>
                  <i className="fa fa-check disabled valid color-green-dark"></i>
                  <em>(اجباری)</em>
                </div>
                <Button
                  style={{ width: '100%', marginTop: '30px' }}
                  type="submit"
                  className="btn btn-m mt-4 mb-0 btn-full bg-blue-dark rounded-sm text-uppercase font-900"
                  // disabled={isLoading}
                >
                  {isLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('Login')}
                </Button>

                <div
                  className="color-theme pointer"
                  style={{ marginTop: '15px', maxWidth: 'fit-content' }}
                  // onClick={(e) => this.showRegisterModal(e)}
                >
                  {t('Register')}
                </div>
                <div
                  className="color-theme pointer"
                  style={{ marginTop: '5px', maxWidth: 'fit-content' }}
                  // onClick={(e) => this.showForgetPasswordModal(e)}
                >
                  {t('ForgotPassword')}
                </div>
                <div className="divider mt-4 mb-3" />
                <div className="footer-title pointer" style={{ fontSize: '14px' }}>
                  {t('TermsAndConditions')}
                </div>
              </Form>
            </div>
          </div>

          <FooterCard />
        </div>

        {/* <RegisterModal
          registerModalVisible={this.state.registerModalVisible}
          hideRegisterModal={(e) => this.hideRegisterModal(e)}
        /> */}
        {/* <ForgetPasswordModal
          forgetPasswordModalVisible={this.state.forgetPasswordModalVisible}
          showEnterCodeModal={(e) => this.showEnterCodeModal(e)}
        /> */}
        {/* <EnterCodeModal
          enterCodeModalVisible={this.state.enterCodeModalVisible}
          mobileNumber={this.state.mobileNumber}
          editMobileNo={(e) => this.editMobileNo(e)}
          resend={(e) => this.resend(e)}
        /> */}

        {/* <div
          onClick={
            this.state.forgetPasswordModalVisible
              ? (e) => this.hideForgetPasswordModal(e)
              : this.state.registerModalVisible
              ? (e) => this.hideRegisterModal(e)
              : this.state.enterCodeModalVisible
              ? (e) => this.hideEnterCodeModal(e)
              : null
          }
          className={this.state.viewBgVisible ? 'menu-hider menu-active' : ''}
        /> */}
      </div>
    </>
  );
};

export default Login;
