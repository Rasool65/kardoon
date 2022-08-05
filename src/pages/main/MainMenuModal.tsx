import { URL_LOGIN } from '@src/configs/urls';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';
import { CustomFunctions } from '@src/utils/custom';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SelectCity from '../city/SelectCity';
import { IModalModel } from './../authentication/ModalModel';

const MainMenuModal: FunctionComponent<IModalModel> = ({ mainMenuVisible }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    CustomFunctions();
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
        <div data-toggle-theme className="border-right-0 pointer">
          <i className="fa font-12 color-yellow1-dark fa-lightbulb" />
        </div>
        <div
          className="border-right-0 pointer"
          //  onClick={(e) => showThemeColorModal(e)}
        >
          <i className="fa font-12 color-green1-dark fa-brush" />
        </div>
        <div data-menu="menu-share" className="border-right-0 pointer">
          <i className="fa font-12 color-red2-dark fa-share-alt" />
        </div>
        <div className="border-right-0 pointer">
          <i className="fa font-12 color-blue2-dark fa-cog" />
        </div>
        <div className="border-right-0 pointer close-menu">
          <i className="fa font-12 color-red2-dark fa-times" />
        </div>
      </div>

      <SelectCity />

      <div className="menu-logo text-center">
        <a
          href="#"
          // onClick={(e) => goToUserProfile(e)}
        >
          <img className="rounded-circle bg-highlight" width="80" src="images/avatars/5s.png" alt="Avatar" />
        </a>
        <h1 className="pt-3 font-800 font-28 text-uppercase">کاردون</h1>
        <p className="font-11 mt-n2">
          کار رو به <span className="color-highlight">کاردون </span>بسپار!
        </p>
      </div>

      <div className="menu-items">
        <h5 className="text-uppercase opacity-20 font-12 pr-3">منوی کاردون</h5>
        <a
          id="nav-welcome"
          href="#"
          // onClick={(e) => goToHome(e)}
        >
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
        <a
          id="nav-starters"
          href="#"
          // onClick={(e) => goToMyAddresses(e)}
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
        </a>
        <a
          id="nav-features"
          href="#"
          // onClick={(e) => goToMyComplexList(e)}
        >
          <i
            data-feather="heart"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="red2-dark"
            data-feather-bg="red2-fade-dark"
          />
          <span>مجموعه های من</span>
          <i className="fa fa-circle" />
        </a>
        <a
          id="nav-pages"
          href="#"
          // onClick={(e) => goToMyOrders(e)}
        >
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
        <a id="nav-media" href="media.html">
          <i
            data-feather="image"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="green1-dark"
            data-feather-bg="green1-fade-dark"
          />
          <span>تصاویر</span>
          <i className="fa fa-circle" />
        </a>
        <a href="#" data-submenu="sub-contact">
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
        </a>
        <div id="sub-contact" className="submenu">
          <a href="contact.html" id="nav-contact">
            <i className="fa fa-envelope color-blue2-dark font-16 opacity-30" />
            <span>Email</span>
            <i className="fa fa-circle" />
          </a>
          <a href="#">
            <i className="fa fa-phone color-green1-dark font-16 opacity-50" />
            <span>Phone</span>
            <i className="fa fa-circle" />
          </a>
          <a href="#">
            <i className="fab fa-whatsapp color-whatsapp font-16 opacity-30" />
            <span>WhatsApp</span>
            <i className="fa fa-circle" />
          </a>
        </div>
        <a id="nav-settings" href="settings.html">
          <i
            data-feather="settings"
            data-feather-line="1"
            data-feather-size="16"
            data-feather-color="gray2-dark"
            data-feather-bg="gray2-fade-dark"
          />
          <span>تنظیمات</span>
          <i className="fa fa-circle" />
        </a>
        <a
          href="#"
          className="close-menu"
          onClick={() => {
            dispatch(handleLogout()), navigate(URL_LOGIN);
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
        <a href="#" className="icon icon-xs mr-1 rounded-s bg-facebook">
          <i className="fab fa-facebook" />
        </a>
        <a href="#" className="icon icon-xs mr-1 rounded-s bg-twitter">
          <i className="fab fa-twitter" />
        </a>
        <a href="#" className="icon icon-xs mr-1 rounded-s bg-instagram">
          <i className="fab fa-instagram" />
        </a>
        <a href="#" className="icon icon-xs mr-1 rounded-s bg-linkedin">
          <i className="fab fa-linkedin-in" />
        </a>
        <a href="#" className="icon icon-xs rounded-s bg-whatsapp">
          <i className="fab fa-whatsapp" />
        </a>
        <p className="mb-0 pt-3 font-10 opacity-30">تمامی حقوق برای کاردون محفوظ می باشد. ۱۴۰1 – ۲۰۲۲</p>
      </div>
    </div>
  );
};
export default MainMenuModal;
