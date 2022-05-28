import { FunctionComponent, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN, URL_MAIN } from '../../configs/urls';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
// import { yupResolver } from '@hookform/resolvers/yup';

// ** Styles

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import { LoginModelSchema, ILoginModel } from '@src/models/input/authentication/ILoginModel';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import logo from '@src/assets/images/ath.png';
import themeConfig from '@src/configs/theme/themeConfig';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const tokenAuthentication = useTokenAuthentication();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const toast = useToast();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  //   const {
  //     control,
  //     setError,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  const onSubmit = (data: ILoginModel) => {
    if (data && !isLoading) {
      setIsLoading(true);
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { username: data.userName, password: data.password })
        .then((result) => {
          dispatch(handleLogin({ token: result.data.data.token, username: data.userName }));
          navigate(URL_MAIN);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="card card-style">
      <div className="content mt-2 mb-0">
        <div className="input-style no-borders has-icon validate-field mb-4">
          <i className="fa fa-user"></i>
          <input type="name" className="form-control validate-name" id="form1a" placeholder="Name" />
          <label className="color-blue-dark font-10 mt-1">Name</label>
          <i className="fa fa-times disabled invalid color-red-dark"></i>
          <i className="fa fa-check disabled valid color-green-dark"></i>
          <em>(required)</em>
        </div>

        <div className="input-style no-borders has-icon validate-field mb-4">
          <i className="fa fa-lock"></i>
          <input type="password" className="form-control validate-password" id="form3a" placeholder="Password" />
          <label className="color-blue-dark font-10 mt-1">Password</label>
          <i className="fa fa-times disabled invalid color-red-dark"></i>
          <i className="fa fa-check disabled valid color-green-dark"></i>
          <em>(required)</em>
        </div>

        <a href="#" className="btn btn-m mt-4 mb-4 btn-full bg-green-dark rounded-sm text-uppercase font-900">
          Login
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
              Create Account
            </a>
          </div>
          <div className="w-50 font-11 pb-2 color-theme opacity-60 pb-3 text-end">
            <a href="system-forgot-1.html" className="color-theme">
              Forgot Credentials
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
