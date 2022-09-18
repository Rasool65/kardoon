import IFooterProps from '@src/configs/routerConfig/IFooterProps';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { URL_MY_ORDERS, URL_USER_PROFILE } from './../configs/urls';
import { URL_MAIN, URL_TECHNICIAN_MISSION } from '@src/configs/urls';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';

const FooterCard: FunctionComponent<IFooterProps> = ({ footerMenuVisible, activePage }) => {
  const userData = useSelector((state: RootStateType) => state.authentication.userData);

  const checkRole = (normalizedName: string) => {
    debugger;
    return userData?.roles ? userData?.roles.some((roleName) => roleName.normalizedName === normalizedName) : false;
  };
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(URL_MAIN);
  };

  const goToProfile = () => {
    navigate(URL_USER_PROFILE);
  };
  const goToMyMissions = () => {
    navigate(URL_TECHNICIAN_MISSION);
  };

  const goToMyOrders = () => {
    navigate(URL_MY_ORDERS);
  };
  return (
    <div id="footer-bar" className={footerMenuVisible ? 'footer-bar-5' : 'footer-bar-5 footer-menu-hidden'}>
      {checkRole('TECHNICIAN') ? (
        <div className={`${activePage === 1 ? 'active-nav' : ''} pointer`} onClick={() => goToMyMissions()}>
          <i
            data-feather="heart"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="red-dark"
            data-feather-bg="red-fade-light"
          ></i>
          <span>ماموریت های من</span>
        </div>
      ) : (
        <div className={`${activePage === 1 ? 'active-nav' : ''} pointer`} onClick={() => goToMyOrders()}>
          <i
            data-feather="heart"
            data-feather-line="1"
            data-feather-size="21"
            data-feather-color="red-dark"
            data-feather-bg="red-fade-light"
          ></i>
          <span>سفارشات من</span>
        </div>
      )}

      <div className={`${activePage === 2 ? 'active-nav' : ''} pointer`} onClick={(e) => goToHome()}>
        <i
          data-feather="home"
          data-feather-line="1"
          data-feather-size="21"
          data-feather-color="green-dark"
          data-feather-bg="green-fade-light"
        ></i>
        <span>خانه</span>
      </div>
      <div className={`${activePage === 3 ? 'active-nav' : ''} pointer`} onClick={(e) => goToProfile()}>
        <i
          data-feather="file"
          data-feather-line="1"
          data-feather-size="21"
          data-feather-color="blue-dark"
          data-feather-bg="blue-fade-light"
        ></i>
        <span>حساب کاربری</span>
      </div>
    </div>
  );
};

export default FooterCard;
