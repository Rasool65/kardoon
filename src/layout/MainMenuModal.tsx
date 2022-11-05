import {
  URL_CHANGE_PASSWORD,
  URL_CONVERSATION,
  URL_LOGIN,
  URL_MAIN,
  URL_MY_ORDERS,
  URL_TECHNICIAN_MISSION,
  URL_TECHNICIAN_PROFILE,
} from '@src/configs/urls';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { RootStateType } from '@src/redux/Store';
import { init_template } from '@src/pages/main/template';
import { IModalModel } from '@src/pages/authentication/ModalModel';
import SelectCity from '@src/pages/city/SelectCity';

const MainMenuModal: FunctionComponent<IModalModel> = ({ mainMenuVisible }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const messageCount = useSelector((state: RootStateType) => state.message.newMessageCount);

  function checkRole(normalizedName: string) {
    return userData?.roles.some((roleName) => roleName.normalizedName === normalizedName);
  }

  useEffect(() => {
    init_template();
  }, [mainMenuVisible]);
  return (
    <div
      id="menu-main"
      // className={`menu menu-box-right menu-box-detached rounded-m ${mainMenuVisible ? 'menu-active' : ''}`}
      className="menu menu-box-right menu-box-detached rounded-m"
      data-menu-width="260"
      style={{ display: 'inherit' }}
      data-menu-active="nav-welcome"
      data-menu-effect="menu-over"
    >
      <div className="menu-header">
        {/* <div data-toggle-theme className="border-right-0 pointer">
          <i className="fa font-12 color-yellow1-dark fa-lightbulb" />
        </div> */}
        {/* <div
          className="border-right-0 pointer"
          //  onClick={(e) => showThemeColorModal(e)}
        >
          <i className="fa font-12 color-green1-dark fa-brush" />
        </div> */}
        {/* <div data-menu="menu-share" className="border-right-0 pointer">
          <i className="fa font-12 color-red2-dark fa-share-alt" />
        </div> */}
        {/* <div className="border-right-0 pointer">
          <i className="fa font-12 color-blue2-dark fa-cog" />
        </div> */}
        <div className="border-right-0 pointer close-menu float-end">
          <i className="fa font-12 color-red2-dark fa-times" style={{ float: 'left', margin: '20px' }} />
        </div>
      </div>
      <SelectCity />
      <div className="menu-logo text-center">
        <a
          style={{ cursor: 'pointer' }}
          // onClick={(e) => goToUserProfile(e)}
        >
          <img className="rounded-circle bg-highlight" width="80" src={require('/src/scss/images/avatars/5s.png')} alt="Avatar" />
        </a>
        <h1 className="pt-3 font-800 font-28 text-uppercase">کاردون</h1>
        <p className="font-11 mt-n2">
          کار رو به <span className="color-highlight">کاردون </span>بسپار!
        </p>
      </div>
      <div className="menu-items">
        <h5 className="text-uppercase opacity-20 font-12 pr-3">منوی کاردون</h5>
        <a className="close-menu" id="nav-welcome" style={{ cursor: 'pointer' }} onClick={() => navigate(URL_MAIN)}>
          <i
            data-feather="home"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="blue2-dark"
            data-feather-bg="blue2-fade-dark"
          />
          <span>صفحه اصلی</span>
          <em className="badge bg-highlight color-white">HOT</em>
          <i className="fa fa-circle" />
        </a>
        {/* <a className="close-menu" style={{ cursor: 'pointer' }} onClick={() => navigate(URL_CHANGE_PASSWORD)}>
          <i className="fa fa-key font-16 color-red-dark"></i>
          <span>تغییر کلمه عبور</span>
          <em className="badge bg-highlight color-white"></em>
          <i className="fa fa-circle" />
        </a> */}
        <a className="close-menu" style={{ cursor: 'pointer' }} onClick={() => navigate(URL_CONVERSATION)}>
          <i className="fa fa-comment font-16 color-green-dark"></i>
          <span>لیست پیام ها</span>
          <em className="badge bg-danger color-white">{messageCount > 0 && messageCount}</em>
          <i className="fa fa-circle" />
        </a>
        {/* <a
          id="nav-starters"
          style={{cursor:'pointer'}}
         onClick={(e) => navigate('/address')}
        >
          <i
            data-feather="star"
            data-feather-line="1"
            data-feather-size="18"
            data-feather-color="yellow1-dark"
            data-feather-bg="yellow1-fade-dark"
          />
          <span>آدرس های من</span>
          <i className="fa fa-circle" />
        </a> */}
        <a id="nav-pages" className="close-menu" style={{ cursor: 'pointer' }} onClick={() => navigate(URL_MY_ORDERS)}>
          <i
            data-feather="file"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="brown1-dark"
            data-feather-bg="brown1-fade-dark"
          />
          <span>سفارشات من</span>
          <i className="fa fa-circle" />
        </a>
        {checkRole('TECHNICIAN') && (
          <>
            <a
              id="nav-pages"
              className="close-menu"
              style={{ cursor: 'pointer' }}
              // onClick={() => navigate(`${URL_TECHNICIAN_PROFILE}?id=${userData?.userId}`)}
              onClick={() => navigate(generatePath(URL_TECHNICIAN_PROFILE, { id: userData?.userId.toString() }))}
            >
              <i
                data-feather="file"
                data-feather-line="1"
                data-feather-size="16"
                data-feather-color="brown1-dark"
                data-feather-bg="brown1-fade-dark"
              />
              <span>پروفایل تکنسین</span>
              <i className="fa fa-circle" />
            </a>
            <a
              id="nav-features"
              style={{ cursor: 'pointer' }}
              className="close-menu"
              onClick={() => navigate(URL_TECHNICIAN_MISSION)}
            >
              <i
                data-feather="heart"
                data-feather-line="1"
                data-feather-size="16"
                data-feather-color="red2-dark"
                data-feather-bg="red2-fade-dark"
              />
              <span>لیست ماموریت ها</span>
              <i className="fa fa-circle" />
            </a>
          </>
        )}
        {/* <a id="nav-media" href="media.html">
          <i
            data-feather="image"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="green1-dark"
            data-feather-bg="green1-fade-dark"
          />
          <span>تصاویر</span>
          <i className="fa fa-circle" />
        </a> */}
        {/* <a style={{cursor:'pointer'}} data-submenu="sub-contact">
          <i
            data-feather="mail"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="blue2-dark"
            data-feather-bg="blue2-fade-dark"
          />
          <span>مخاطبین</span>
          <strong className="badge bg-highlight color-white">1</strong>
          <i className="fa fa-circle" />
      </a> */}
        {/* <a className="close-menu" id="nav-settings" href="settings.html">
          <i
            data-feather="settings"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="gray2-dark"
            data-feather-bg="gray2-fade-dark"
          />
          <span>تنظیمات</span>
          <i className="fa fa-circle" />
        </a> */}
        <a
          style={{ cursor: 'pointer' }}
          className="close-menu"
          onClick={() => {
            dispatch(handleLogout()), navigate(URL_LOGIN);
            location.reload();
          }}
        >
          <i
            data-feather="x"
            data-feather-line="3"
            data-feather-size="16"
            data-feather-color="red2-dark"
            data-feather-bg="red2-fade-dark"
          />
          <span>خروج</span>
          <i className="fa fa-circle" />
        </a>
      </div>
      <div className="text-center pt-2" style={{ direction: 'ltr' }}>
        <a style={{ cursor: 'pointer' }} className="socialmedia-icon bg-facebook">
          <i className="fab fa-facebook" />
        </a>
        <a style={{ cursor: 'pointer' }} className="socialmedia-icon bg-twitter">
          <i className="fab fa-twitter" />
        </a>
        <a style={{ cursor: 'pointer' }} className="socialmedia-icon bg-instagram">
          <i className="fab fa-instagram" />
        </a>
        <a style={{ cursor: 'pointer' }} className="socialmedia-icon bg-linkedin">
          <i className="fab fa-linkedin-in" />
        </a>
        <a style={{ cursor: 'pointer' }} className="socialmedia-icon bg-whatsapp">
          <i className="fab fa-whatsapp" />
        </a>
        <p className="mb-0 pt-3 font-10 opacity-30">تمامی حقوق برای کاردون محفوظ می باشد. ۱۴۰1 – ۲۰۲۲</p>
      </div>
    </div>
  );
};
export default MainMenuModal;
