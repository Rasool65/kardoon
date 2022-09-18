import { yupResolver } from '@hookform/resolvers/yup';
import { APIURL_REGISTER } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useToast } from '@src/hooks/useToast';
import { IRegisterModel, RegisterModelSchema } from '@src/models/input/authentication/IRegisterModel';
import { IRegisterResultModel } from '@src/models/output/authentication/IRegisterResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Row, Spinner } from 'reactstrap';
import { IModalModel } from './ModalModel';

const Register: FunctionComponent<IModalModel> = ({ showRegisterModal, handleRegisterModal }) => {
  const { t }: any = useTranslation();
  const toast = useToast();
  const [input, setInput] = useState<any>({
    mobile: false,
    firstName: false,
    lastName: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterModel>({ mode: 'onChange', resolver: yupResolver(RegisterModelSchema) });

  const onSubmit = (data: IRegisterModel) => {
    setLoading(true);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      gender: data.gender,
    };
    if (data && !loading) {
      httpRequest
        .postRequest<IOutputResult<IRegisterResultModel>>(APIURL_REGISTER, body)
        .then((result) => {
          toast.showSuccess(result.data.message);
          handleRegisterModal();
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <div
        className={`menu menu-box-bottom menu-box-detached rounded-m ${showRegisterModal ? 'menu-active' : ''}`}
        style={{ display: 'inherit', height: 'fit-content', direction: 'rtl' }}
        data-menu-effect="menu-over"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-4" style={{ marginBottom: '0px' }}>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.mobile ? 'input-style-active' : ''}`}>
              <Controller
                name="mobile"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ mobile: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-text"
                      type="number"
                      placeholder={t('EnterMobile')}
                      autoComplete="off"
                      invalid={errors.mobile && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('UserName')}
                    </label>
                    {/*<i className={`fa fa-times disabled invalid color-red-dark ${input.mobile ? 'disabled' : ''}`} />*/}
                    {/*<i className="fa fa-check disabled valid color-green-dark" />*/}
                    <em className={`${input.mobile ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.mobile?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <Container style={{ maxWidth: '100%', margin: '4px 0 10px 0', padding: '0 0 0 0' }}>
              <Row
                style={{
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 0 0 0',
                  marginBottom: '0',
                }}
              >
                <Col style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                  <div className="form-check icon-check">
                    <input
                      {...register('gender', { required: true })}
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="1"
                      id="radio2"
                    />
                    <label className="form-check-label" htmlFor="radio2">
                      {t('Male')}
                    </label>
                    <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                    <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                    <FormFeedback>{errors.gender?.message}</FormFeedback>
                  </div>
                </Col>
                <Col style={{ textAlign: 'right', padding: '0 2px 0 12px' }}>
                  <div className="form-check icon-check">
                    <input
                      {...register('gender', { required: true })}
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="0"
                      id="radio1"
                    />
                    <label className="form-check-label" htmlFor="radio1">
                      {t('Female')}
                    </label>
                    <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                    <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                    <FormFeedback>{errors.gender?.message}</FormFeedback>
                  </div>
                </Col>
              </Row>
            </Container>

            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.firstName ? 'input-style-active' : ''}`}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ firstName: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-name"
                      type="text"
                      placeholder={t('EnterName')}
                      autoComplete="off"
                      invalid={errors.firstName && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('Name')}
                    </label>
                    {/*<i className={`fa fa-times disabled invalid color-red-dark ${input.firstName ? 'disabled' : ''}`} />*/}
                    {/*<i className="fa fa-check disabled valid color-green-dark" />*/}
                    <em className={`${input.firstName ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.firstName?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.lastName ? 'input-style-active' : ''}`}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }: any) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ lastName: true })}
                      style={{ backgroundPosition: 'left', marginTop: '0', height: '53px' }}
                      className="form-control validate-name"
                      type="text"
                      placeholder={t('EnterFamily')}
                      autoComplete="off"
                      invalid={errors.lastName && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('Family')}
                    </label>
                    {/*<i className={`fa fa-times disabled invalid color-red-dark ${input.lastName ? 'disabled' : ''}`} />*/}
                    {/*<i className="fa fa-check disabled valid color-green-dark" />*/}
                    <em className={`${input.lastName ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.lastName?.message}</FormFeedback>
                  </>
                )}
              />
            </div>

            <Button
              style={{ marginTop: '10px' }}
              type="submit"
              className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
            >
              {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('Signup')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Register;
