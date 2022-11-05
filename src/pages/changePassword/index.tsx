import { FunctionComponent, useEffect, useState } from 'react';
import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { CustomFunctions } from '@src/utils/custom';
import Header from '@src/layout/Header';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import MainMenuModal from '@src/layout/MainMenuModal';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner, Input, FormFeedback } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ChangePasswordModelSchema, IChangePasswordModel } from '@src/models/input/authentication/IChangePassword';
import { yupResolver } from '@hookform/resolvers/yup';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_CHANGE_PASSWORD, APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { useToast } from '@src/hooks/useToast';

const ChangePassword: FunctionComponent<IPageProps> = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const toast = useToast();

  const [input, setInput] = useState<any>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordModel>({ mode: 'onChange', resolver: yupResolver(ChangePasswordModelSchema) });

  //todo <button onClick={() => i18n.changeLanguage('fa')}>changeLanguage</button>  */
  const onSubmit = (data: IChangePasswordModel) => {
    setLoading(true);
    const body = {
      userId: userData?.userId,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    if (data && !loading) {
      httpRequest
        .postRequest<IOutputResult<IChangePasswordModel>>(APIURL_CHANGE_PASSWORD, body)
        .then((result) => {
          setLoading(false);
          result.data.isSuccess ? toast.showSuccess(result.data.message) : toast.showError(result.data.message);
          reset({ confirmPassword: '', newPassword: '', oldPassword: '' });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <>
      <div id="page">
        <div className="page-content">
          <div className="page-title page-title-small">
            <h2>
              <a style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-right mx-2"></i>
                بازگشت
              </a>
            </h2>
          </div>
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>
          <div className="card card-style">
            <div className="content mb-0">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <h4>تغییر کلمه عبور</h4>
                <p>رمز عبور خود را از طریق فرم زیر تغییر نمایید</p>
                <div
                  className={`input-style no-borders has-icon validate-field mb-4 ${
                    input.oldPassword ? 'input-style-active' : ''
                  }`}
                >
                  <Controller
                    name="oldPassword"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <i className="fa fa-lock" style={{ marginTop: '15px', top: '0' }} />
                        <Input
                          className="form-control validate-password"
                          style={{ backgroundPosition: 'left' }}
                          autoFocus
                          type="password"
                          placeholder={t('رمز عبور جاری را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.oldPassword && true}
                          {...field}
                          onFocus={(e) => {
                            // field.onChange(e);
                            setInput({ oldPassword: true });
                          }}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('رمز عبور جاری')}
                        </label>
                        <em className={`${input.oldPassword ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.oldPassword?.message}</FormFeedback>
                      </>
                    )}
                  />
                  <em>({t('Required')})</em>
                </div>
                <div
                  className={`input-style no-borders has-icon validate-field mb-4 ${
                    input.newPassword ? 'input-style-active' : ''
                  }`}
                >
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <i className="fa fa-key" style={{ marginTop: '15px', top: '0' }} />
                        <Input
                          className="form-control validate-password"
                          style={{ backgroundPosition: 'left' }}
                          type="password"
                          placeholder={t('رمز عبور جدید را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.newPassword && true}
                          {...field}
                          onFocus={(e) => {
                            // field.onChange(e);
                            setInput({ newPassword: true });
                          }}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('رمز عبور جدید')}
                        </label>
                        <em className={`${input.newPassword ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.newPassword?.message}</FormFeedback>
                      </>
                    )}
                  />
                  <em>({t('Required')})</em>
                </div>
                <div
                  className={`input-style no-borders has-icon validate-field mb-4 ${
                    input.confirmPassword ? 'input-style-active' : ''
                  }`}
                >
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <i className="fa fa-key" style={{ marginTop: '15px', top: '0' }} />
                        <Input
                          className="form-control validate-password"
                          style={{ backgroundPosition: 'left' }}
                          type="password"
                          placeholder={t('تکرار رمز عبور جدید را وارد نمایید')}
                          autoComplete="off"
                          invalid={errors.confirmPassword && true}
                          {...field}
                          onFocus={(e) => {
                            // field.onChange(e);
                            setInput({ confirmPassword: true });
                          }}
                        />
                        <label htmlFor="form4" className="color-highlight">
                          {t('تکرار رمز عبور ')}
                        </label>
                        <em className={`${input.confirmPassword ? 'disabled' : ''}`}>({t('Required')})</em>
                        <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
                      </>
                    )}
                  />
                  <em>({t('Required')})</em>
                </div>
                <Button
                  style={{ marginTop: '10px', width: '100%' }}
                  type="submit"
                  className="btn btn-m mt-4 mb-3 btn-full rounded-sm bg-highlight text-uppercase font-700"
                >
                  {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('تغییر رمز عبور')}
                </Button>
              </Form>
              <div className="divider mt-4 mb-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
