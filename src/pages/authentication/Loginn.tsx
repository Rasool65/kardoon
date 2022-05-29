import { FunctionComponent, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN, URL_MAIN } from '../../configs/urls';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';

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

const Loginn: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const tokenAuthentication = useTokenAuthentication();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const toast = useToast();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

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
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0 d-flex ">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            {/* <img className="img-fluid" src={'source'} alt="Login Cover" /> */}
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="w-100 justify-content-center text-center">
              <img className="img-fluid" src={logo} alt="logo" />
            </div>
            <CardTitle tag="h4" className="fw-bold mb-1 mt-2 text-center text-primary">
              {themeConfig.app.appName}
            </CardTitle>
            {/* <CardText className="mb-2">Please sign-in to your account and start the adventure</CardText> */}
            {/* <Alert color="primary">
              <div className="alert-body font-small-2">
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle id="login-tip" className="position-absolute" size={18} style={{ top: '10px', right: '10px' }} />
              <UncontrolledTooltip target="login-tip" placement="left">
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="login-username">
                  Username
                </Label>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        autoFocus
                        type="text"
                        placeholder="نام کاربری را وار نمایید"
                        autoComplete="off"
                        invalid={errors.userName && true}
                        {...field}
                      />
                      <FormFeedback>{errors.userName?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputPasswordToggle
                        inputClassName=""
                        placeholder="Please enter your password"
                        visible={false}
                        className="input-group-merge"
                        invalid={errors.password && true}
                        {...field}
                      />
                      <FormFeedback>{errors.password?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>

              <Button type="submit" color="primary" block>
                {isLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'Sign In'}
              </Button>
            </Form>
            {/* <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Loginn;
