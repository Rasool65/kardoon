import { yupResolver } from '@hookform/resolvers/yup';
import { APIURL_UPDATE_PROFILE } from '@src/configs/apiConfig/apiUrls';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { useToast } from '@src/hooks/useToast';
import Footer from '@src/layout/Footer';
// import FooterCard from '@src/layout/FooterCard';
import { IUpdateProfileModel, UpdateProfileModelSchema } from '@src/models/input/profile/IUpdateProfileModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IUpdateProfileResultModel } from '@src/models/output/profile/IUpdateProfileResultModel';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';

const Profile: FunctionComponent<IPageProps> = (props) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const dispatch = useDispatch();
  const { t }: any = useTranslation();
  const toast = useToast();
  const [input, setInput] = useState<any>({
    firstName: false,
    lastName: false,
    email: false,
    birthDate: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateProfileModel>({ mode: 'onChange', resolver: yupResolver(UpdateProfileModelSchema) });

  const onSubmit = (data: IUpdateProfileModel) => {
    setLoading(true);
    const body = {
      userName: userData?.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      isPublicEmail: data.isPublicEmail,
      birthDate: data.birthDate,
      gender: data.gender,
    };
    if (data && !loading) {
      httpRequest
        .postRequest<IOutputResult<IUpdateProfileResultModel>>(APIURL_UPDATE_PROFILE, body)
        .then((result) => {
          dispatch(reloadUserData(result));
          toast.showInfo(result.data.message);
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={3} /> */}
        <div id="footer-bar" className="footer-bar-5">
          <a href="index-components.html">
            <i
              data-feather="heart"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="red-dark"
              data-feather-bg="red-fade-light"
            ></i>
            <span>Features</span>
          </a>
          <a href="index-media.html">
            <i
              data-feather="image"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="green-dark"
              data-feather-bg="green-fade-light"
            ></i>
            <span>Media</span>
          </a>
          <a href="index.html" className="active-nav">
            <i
              data-feather="home"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="blue-dark"
              data-feather-bg="blue-fade-light"
            ></i>
            <span>Home</span>
          </a>
          <a href="index-pages.html">
            <i
              data-feather="file"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="brown-dark"
              data-feather-bg="brown-fade-light"
            ></i>
            <span>Pages</span>
          </a>
          <a href="index-settings.html">
            <i
              data-feather="settings"
              data-feather-line="1"
              data-feather-size="21"
              data-feather-color="dark-dark"
              data-feather-bg="gray-fade-light"
            ></i>
            <span>Settings</span>
          </a>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="page-content">
            {/* <HomeHeader showMainMenu={(e) => this.props.showMainMenu(true)} headerTitle={props.title} /> */}

            <div className="menu-logo text-center">
              <img
                className="rounded-circle bg-highlight pointer"
                width="130"
                src={require('/src/scss/images/avatars/5s.png')}
                //   onClick={(e) => this.showSelectAvatarModal(e)}
                style={{ border: '2px solid #FFFFFF', padding: '8px' }}
                alt="menu-logo"
              />
              <img
                src={require('/src/scss/images/forTest/edit_logo.svg')}
                className="pointer"
                // onClick={(e) => this.showSelectAvatarModal(e)}
                style={{ width: '28px', height: '28px', position: 'relative', top: '45px', left: '30px' }}
                alt="edit-logo"
              />
            </div>

            <div className="card card-style p-4" style={{ marginTop: '15px' }}>
              <div
                className={`input-style has-borders no-icon validate-field mb-4 ${input.firstName ? 'input-style-active' : ''}`}
              >
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={userData?.profile?.firstName || ''}
                  render={({ field }) => (
                    <>
                      <Input
                        id="form1a"
                        onFocus={() => setInput({ firstName: true })}
                        style={{ backgroundPosition: 'left' }}
                        className="form-control validate-text"
                        type="text"
                        placeholder={t('Name')}
                        autoComplete="off"
                        invalid={errors.firstName && true}
                        {...field}
                      />
                      <label htmlFor="form4" className="color-highlight">
                        {t('Name')}{' '}
                      </label>
                      <i className={`fa fa-times disabled invalid color-red-dark ${input.firstName ? 'disabled' : ''}`} />
                      <em className={`${input.firstName ? 'disabled' : ''}`}>({t('Required')})</em>
                      <FormFeedback>{errors.firstName?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>
              <div
                className={`input-style has-borders no-icon validate-field mb-4 ${input.lastName ? 'input-style-active' : ''}`}
              >
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={userData?.profile?.lastName || ''}
                  render={({ field }) => (
                    <>
                      <Input
                        id="form1a"
                        onFocus={() => setInput({ lastName: true })}
                        style={{ backgroundPosition: 'left' }}
                        className="form-control validate-text"
                        type="text"
                        placeholder={t('Family')}
                        autoComplete="off"
                        invalid={errors.lastName && true}
                        {...field}
                      />
                      <label htmlFor="form4" className="color-highlight">
                        {t('Family')}
                      </label>
                      <i className={`fa fa-times disabled invalid color-red-dark ${input.lastName ? 'disabled' : ''}`} />
                      <em className={`${input.lastName ? 'disabled' : ''}`}>({t('Required')})</em>
                      <FormFeedback>{errors.lastName?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>
              <div className={`input-style has-borders no-icon validate-field mb-4 ${input.email ? 'input-style-active' : ''}`}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={userData?.profile?.email || ''}
                  render={({ field }) => (
                    <>
                      <Input
                        id="form1a"
                        onFocus={() => setInput({ email: true })}
                        style={{ backgroundPosition: 'left' }}
                        className="form-control validate-text"
                        type="text"
                        placeholder={t('EnterEmail')}
                        autoComplete="off"
                        invalid={errors.email && true}
                        {...field}
                      />
                      <label htmlFor="form4" className="color-highlight">
                        {t('Email')}
                      </label>
                      <i className={`fa fa-times disabled invalid color-red-dark ${input.email ? 'disabled' : ''}`} />
                      <em className={`${input.email ? 'disabled' : ''}`}>({t('Required')})</em>
                      <FormFeedback>{errors.email?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label className="form-label">{t('BirthDate')} </Label>
                <Controller
                  name="birthDate"
                  control={control}
                  defaultValue={userData?.profile?.birthDate || ''}
                  render={({ field: { onChange, name, value } }) => (
                    <>
                      <DatePicker
                        render={
                          <InputIcon
                            style={{ height: 'calc(2.4em + 0.75rem - 6px)', width: '100%' }}
                            // style={darkMode ? darkStyle : lighStyle}
                          />
                        }
                        weekDays={weekDays}
                        // className={darkMode ? 'green custom-calendar' : ''}
                        inputClass="form-control"
                        onChange={(date: any) => {
                          const selectedDate = date.toDate();
                          onChange(selectedDate.toISOString());
                        }}
                        value={value}
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      <FormFeedback className="d-block">{errors.birthDate?.message}</FormFeedback>
                    </>
                  )}
                />
              </div>
              <Container style={{ maxWidth: '100%', margin: '4px 0 10px 0', padding: '0 0 0 0' }}>
                <Label>{t('PublicEmail')}</Label>
                <Row>
                  <Col style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                    <div className="form-check icon-check">
                      <input
                        {...register('isPublicEmail', { required: true })}
                        className="form-check-input"
                        type="radio"
                        name="isPublicEmail"
                        defaultChecked={userData?.profile?.isPublicEmail == true}
                        value="true"
                        id="radio3"
                      />
                      <label className="form-check-label" htmlFor="radio3">
                        {t('Public')}
                      </label>
                      <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                      <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                      <FormFeedback>{errors.isPublicEmail?.message}</FormFeedback>
                    </div>
                  </Col>
                  <Col style={{ textAlign: 'right', padding: '0 2px 0 12px' }}>
                    <div className="form-check icon-check">
                      <input
                        {...register('isPublicEmail', { required: true })}
                        className="form-check-input"
                        type="radio"
                        name="isPublicEmail"
                        defaultChecked={userData?.profile?.isPublicEmail == false}
                        value="false"
                        id="radio4"
                      />
                      <label className="form-check-label" htmlFor="radio4">
                        {t('Private')}
                      </label>
                      <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                      <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                      <FormFeedback>{errors.isPublicEmail?.message}</FormFeedback>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container style={{ maxWidth: '100%', margin: '4px 0 10px 0', padding: '0 0 0 0' }}>
                <Label>{t('Gender')}</Label>
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
                        defaultChecked={userData?.profile?.gender == 1}
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
                        defaultChecked={userData?.profile?.gender == 0}
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

              <div className="row mb-2" style={{ padding: '30px 25px 5px 25px' }}>
                <Button
                  type="submit"
                  // onClick={(e) => completeRegistration(e)}
                  className="btn btn-m btn-full shadow-s rounded-s bg-highlight text-uppercase font-700"
                >
                  {loading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : t('SaveChanges')}
                </Button>
              </div>
            </div>

            {/* <FooterCard /> */}
          </div>
        </Form>
        {/* <SelectAvatarModal
                    selectAvatarModalVisible={this.state.selectAvatarModalVisible}
                    hideSelectAvatarModal={(e) => this.hideSelectAvatarModal(e)}/>

                <MainMenu
                    mainMenuVisible={this.state.mainMenuVisible}
                    hideMainMenu={(e) => this.hideMainMenu(e)}/>

                <ThemeColorModal
                    themeColorModalVisible={this.state.themeColorModalVisible}
                    hideThemeColorModal={(e) => this.hideThemeColorModal(e)}/>

                <div onClick={this.state.selectAvatarModalVisible ? (e) => this.hideSelectAvatarModal(e)
                    : null}
                     className={(this.state.viewBgVisible) ? "menu-hider menu-active" : ""}/> */}
      </div>
    </>
  );
};
export default Profile;
