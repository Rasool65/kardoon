import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import useHttpRequest from '@src/hooks/useHttpRequest';
// import About from './About';
// import { Link } from 'react-router-dom';
// import { URL_DASHBOARD, URL_LOGIN } from '@src/configs/urls';
// import { RootStateType } from '@src/redux/Store';
import { Col, Container, FormFeedback, Input, Row } from 'reactstrap';
import { ILoginModel, LoginModelSchema } from '@src/models/input/authentication/ILoginModel';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Login: FunctionComponent<IPageProps> = (props) => {
  const { i18n, t } = useTranslation();
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  {
    /* //todo <button onClick={() => i18n.changeLanguage('fa')}>changeLanguage</button>  */
  }
  // const onSubmit = (data: ILoginModel) => {
  //   if (data && !isLoading) {
  //     setIsLoading(true);
  //     httpRequest
  //       .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { username: data.userName, password: data.password })
  //       .then((result) => {
  //         dispatch(handleLogin({ token: result.data.data.token, username: data.userName }));
  //         navigate(URL_MAIN);
  //       })
  //       .finally(() => setIsLoading(false));
  //   }
  // };

  return (
    <>
      <div className="card card-style">
        <div className="content mt-2 mb-0">
          <div className="input-style no-borders has-icon validate-field mb-4">
            <i className="fa fa-user"></i>
            <input type="name" className="form-control validate-name" id="form1a" placeholder="نام" />
            <label className="color-blue-dark font-10 mt-1">{t('UserName')}</label>
            {/* <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    className="form-control validate-name"
                    autoFocus
                    type="text"
                    placeholder={t('EnterUserName')}
                    autoComplete="off"
                    invalid={errors.userName && true}
                    {...field}
                  />
                  <FormFeedback>{errors.userName?.message}</FormFeedback>
                </>
              )}
            /> */}
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(اجباری)</em>
          </div>

          <div className="input-style no-borders has-icon validate-field mb-4">
            <i className="fa fa-lock"></i>
            <input type="password" className="form-control validate-password" id="form3a" placeholder="رمز عبور" />
            <label className="color-blue-dark font-10 mt-1">رمز عبور</label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(اجباری)</em>
          </div>

          <a href="#" className="btn btn-m mt-4 mb-4 btn-full bg-green-dark rounded-sm text-uppercase font-900">
            ورود
          </a>

          <div className="divider"></div>

          <a href="#" className="btn btn-icon btn-m rounded-sm btn-full shadow-l bg-facebook text-uppercase font-700 text-start">
            <i className="fab fa-facebook-f text-center"></i>Login with Facebook
          </a>
          <a
            href="#"
            className="btn btn-icon btn-m rounded-sm mt-2 btn-full shadow-l bg-twitter text-uppercase font-700 text-start"
          >
            <i className="fab fa-twitter text-center"></i>Login with Twitter
          </a>

          <div className="divider mt-4 mb-3"></div>

          <div className="d-flex">
            <div className="w-50 font-11 pb-2 color-theme opacity-60 pb-3 text-start">
              <a href="system-signup-1.html" className="color-theme">
                ثبت نام
              </a>
            </div>
            <div className="w-50 font-11 pb-2 color-theme opacity-60 pb-3 text-end">
              <a href="system-forgot-1.html" className="color-theme">
                فراموشی رمز عبور
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
