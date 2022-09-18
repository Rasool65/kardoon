import { yupResolver } from '@hookform/resolvers/yup';
import React, { FunctionComponent, useState } from 'react';
import { Button, Form, FormFeedback, Input, Spinner } from 'reactstrap';
import EnterCode from './EnterCode';
import { IModalModel } from './ModalModel';
import { ForgetPasswordModelSchema, IForgetPasswordModel } from './../../models/input/authentication/IForgetPasswordModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IForgetPasswordResultModel } from '@src/models/output/authentication/IForgetPasswordResultModel';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { APIURL_SEND_PASSWORD } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

const PasswordMessage: FunctionComponent<IModalModel> = ({ showForgetPasswordModal, setForgetPasswordModalVisible }) => {
  const { t }: any = useTranslation();
  const httpRequest = useHttpRequest(RequestDataType.json);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>();
  const toast = useToast();
  const [input, setInput] = useState<any>({
    mobile: false,
  });
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPasswordModel>({ mode: 'onChange', resolver: yupResolver(ForgetPasswordModelSchema) });

  const handleEditMobileNo = () => {
    setShow(false);
    setForgetPasswordModalVisible(true);
  };

  const onSubmit = (data: IForgetPasswordModel) => {
    setLoading(true);

    if (data && !loading) {
      httpRequest
        .postRequest<IOutputResult<IForgetPasswordResultModel>>(APIURL_SEND_PASSWORD, data)
        .then((result) => {
          toast.showSuccess(result.data.message);
          setMobileNumber(data.mobileNumber);
          setShow(true);
          setForgetPasswordModalVisible(false);
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <div
        className={`menu menu-box-bottom menu-box-detached rounded-m ${showForgetPasswordModal ? 'menu-active' : ''}`}
        style={{ display: 'inherit', height: 'fit-content' }}
        data-menu-effect="menu-over"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="card p-4" style={{ marginBottom: '0px' }}>
            {t('LoginWithSMS')}
            <div
              style={{ marginTop: '15px' }}
              className={`input-style has-borders no-icon validate-field mb-4 ${input.mobile ? 'input-style-active' : ''}`}
            >
              <Controller
                name="mobileNumber"
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
                      invalid={errors.mobileNumber && true}
                      {...field}
                    />
                    <label htmlFor="form4" className="color-highlight">
                      {t('UserName')}
                    </label>
                    {/*<i className={`fa fa-times disabled invalid color-red-dark ${input.mobile ? 'disabled' : ''}`} />*/}
                    {/*<i className="fa fa-check disabled valid color-green-dark" />*/}
                    <em className={`${input.mobile ? 'disabled' : ''}`}>({t('Required')})</em>
                    <FormFeedback>{errors.mobileNumber?.message}</FormFeedback>
                  </>
                )}
              />
            </div>
            <Button
              type="submit"
              style={{ marginTop: '15px' }}
              className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
            >
              {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('ReceivePassword')}
            </Button>
          </div>
        </Form>
      </div>
      <EnterCode showEnterCodeModal={show} mobileNumber={mobileNumber} handleEditMobileNo={handleEditMobileNo} />
    </>
  );
};
export default PasswordMessage;
