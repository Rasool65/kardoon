import { yupResolver } from '@hookform/resolvers/yup';
import { APIURL_REGISTER } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IRegisterModel, RegisterModelSchema } from '@src/models/input/authentication/IRegisterModel';
import { IRegisterResultModel } from '@src/models/output/authentication/IRegisterResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Row } from 'reactstrap';
import { IModalModel } from './ModalModel';

const Register: FunctionComponent<IModalModel> = ({ showModal }) => {
  const { t }: any = useTranslation();
  const [input, setInput] = useState<any>({
    mobile: false,
    firstName: false,
    lastName: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterModel>({ mode: 'onChange', resolver: yupResolver(RegisterModelSchema) });

  const onSubmit = (data: IRegisterModel) => {
    setIsLoading(true);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      gender: data.gender,
    };
    debugger;
    if (data && !isLoading) {
      httpRequest
        .postRequest<IOutputResult<IRegisterResultModel>>(APIURL_REGISTER, body)
        .then((result) => {
          debugger;
          let a = result.data.message;
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <>
      <div
        className={`menu menu-box-bottom menu-box-detached rounded-m ${showModal ? 'menu-active' : ''}`}
        data-menu-height="485"
        style={{ display: 'inherit', height: 'auto', direction: 'rtl' }}
        data-menu-effect="menu-over"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-4" style={{ marginBottom: '0px' }}>
            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.mobile ? 'input-style-active' : ''}`}>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ mobile: true })}
                      style={{ backgroundPosition: 'left' }}
                      className="form-control validate-text"
                      type="text"
                      placeholder={t('EnterMobile')}
                      autoComplete="off"
                      invalid={errors.mobile && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('UserName')}
                    </label>
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.mobile ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
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
                    {/* <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      checked
                      id="radio1"
                    /> */}
                    <label className="form-check-label" htmlFor="radio1">
                      {t('Male')}
                    </label>
                    <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                    <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                  </div>
                </Col>
                <Col style={{ textAlign: 'right', padding: '0 2px 0 12px' }}>
                  <div className="form-check icon-check">
                    <Controller
                      render={({ field }) => (
                        <FormGroup aria-label="gender" {...field} name="gender1">
                          <FormGroup value="female" control={<input />} label="Female" />
                          <FormGroup value="male" control={<input />} label="Male" />
                        </FormGroup>
                      )}
                      rules={{ required: true }}
                      name="gender"
                      control={control}
                    />
                    <FormFeedback>{errors.gender?.message}</FormFeedback>
                    {/* <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                         
                          <Input
                          id="form1a"
                          onFocus={(e) => isTypingToggle(e, 1, !inputs[1].it)}
                          style={{ backgroundPosition: 'left' }}
                          className="form-control validate-name"
                          autoFocus
                          type="text"
                          placeholder={t('EnterMobile')}
                          autoComplete="off"
                          invalid={errors.username && true}
                          {...field}
                        />

                          <label className="form-check-label" htmlFor="radio2">
                            {t('Female')}
                          </label>
                          <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                          <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />

                          <FormFeedback>{errors.gender?.message}</FormFeedback>
                        </>
                      )}
                    /> */}
                    {/* <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="radio2"
                    /> */}
                  </div>
                </Col>
              </Row>
            </Container>

            <div className={`input-style has-borders no-icon validate-field mb-4 ${input.firstName ? 'input-style-active' : ''}`}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ firstName: true })}
                      style={{ backgroundPosition: 'left' }}
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
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.firstName ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
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
                render={({ field }) => (
                  <>
                    <Input
                      id="form1a"
                      onFocus={() => setInput({ lastName: true })}
                      style={{ backgroundPosition: 'left' }}
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
                    <i className={`fa fa-times disabled invalid color-red-dark ${input.lastName ? 'disabled' : ''}`} />
                    <i className="fa fa-check disabled valid color-green-dark" />
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
              {t('Signup')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Register;