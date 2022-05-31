// import { FunctionComponent, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import IPageProps from '../../configs/routerConfig/IPageProps';
// import useHttpRequest from '@src/hooks/useHttpRequest';
// // import { Link } from 'react-router-dom';
// // import { URL_DASHBOARD, URL_LOGIN } from '@src/configs/urls';
// // import { RootStateType } from '@src/redux/Store';
// import { Button, Col, Container, Form, FormFeedback, Input, Row } from 'reactstrap';
// import { ILoginModel, LoginModelSchema } from '@src/models/input/authentication/ILoginModel';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Controller, useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { IOutputResult } from '@src/models/output/IOutputResult';
// import { APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
// import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
// import { handleLogin } from '@src/redux/reducers/authenticationReducer';
// import { URL_HOME } from './../../configs/urls';
// import LoginFooter from './LoginFooter';

// const Loginn: FunctionComponent<IPageProps> = (props) => {
//   const navigate = useNavigate();
//   const httpRequest = useHttpRequest();
//   // const tokenAuthentication = useTokenAuthentication();
//   const dispatch = useDispatch();
//   const { i18n, t } = useTranslation();
//   useEffect(() => {
//     document.title = props.title;
//   }, [props.title]);

//   const [isLoading, setIsLoading] = useState<Boolean>(false);

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

//   //todo <button onClick={() => i18n.changeLanguage('fa')}>changeLanguage</button>  */

//   const onSubmit = (data: ILoginModel) => {
//     debugger;
//     if (data && !isLoading) {
//       setIsLoading(true);
//       httpRequest
//         .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { mobile: data.mobile, password: data.password })
//         .then((result: any) => {
//           dispatch(handleLogin({ token: result.data.data.token, mobile: data.mobile }));
//           navigate(URL_HOME);
//         })
//         .finally(() => setIsLoading(false));
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <div className="card card-style">
//           <div className="content mt-2 mb-0">
//             <div className="input-style no-borders has-icon validate-field mb-4">
//               <i className="fa fa-user"></i>
//               {/* <input type="name" className="form-control validate-name" id="form1a" placeholder="نام" />
//             <label className="color-blue-dark font-10 mt-1">{t('UserName')}</label> */}
//               <Controller
//                 name="mobile"
//                 control={control}
//                 render={({ field }) => (
//                   <>
//                     <Input
//                       className="form-control validate-name"
//                       autoFocus
//                       type="text"
//                       placeholder={t('EnterMobile')}
//                       autoComplete="off"
//                       invalid={errors.mobile && true}
//                       {...field}
//                     />
//                     <FormFeedback>{errors.mobile?.message}</FormFeedback>
//                   </>
//                 )}
//               />
//               <i className="fa fa-times disabled invalid color-red-dark"></i>
//               <i className="fa fa-check disabled valid color-green-dark"></i>
//               <em>(اجباری)</em>
//             </div>

//             <div className="input-style no-borders has-icon validate-field mb-4">
//               <i className="fa fa-lock"></i>
//               {/* <input type="password" className="form-control validate-password" id="form3a" placeholder="رمز عبور" />
//             <label className="color-blue-dark font-10 mt-1">رمز عبور</label> */}
//               <Controller
//                 name="password"
//                 control={control}
//                 render={({ field }) => (
//                   <>
//                     <Input
//                       className="form-control validate-password"
//                       autoFocus
//                       type="password"
//                       placeholder={t('EnterPassword')}
//                       autoComplete="off"
//                       invalid={errors.password && true}
//                       {...field}
//                     />
//                     <FormFeedback>{errors.password?.message}</FormFeedback>
//                   </>
//                 )}
//               />
//               <i className="fa fa-times disabled invalid color-red-dark"></i>
//               <i className="fa fa-check disabled valid color-green-dark"></i>
//               <em>(اجباری)</em>
//             </div>

//             <Button
//               style={{ width: '100%' }}
//               type="submit"
//               className="btn btn-m mt-4 mb-4 btn-full bg-green-dark rounded-sm text-uppercase font-900"
//             >
//               {t('Login')}
//             </Button>
//           </div>
//         </div>
//       </Form>
//       <LoginFooter />
//     </>
//   );
// };

// export default Loginn;
