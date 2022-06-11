import IFooterProps from '@src/configs/routerConfig/IFooterProps';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { URL_HOME, URL_MY_ORDERS, URL_USER_PROFILE } from './../configs/urls';

const FooterCard: FunctionComponent<IFooterProps> = ({ footerMenuVisible, activePage }) => {
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(URL_HOME);
  };

  const goToProfile = () => {
    navigate(URL_USER_PROFILE);
  };

  const goToMyOrders = () => {
    navigate(URL_MY_ORDERS);
  };
  return (
    <div id="footer-bar" className={footerMenuVisible ? 'footer-bar-5' : 'footer-bar-5 footer-menu-hidden'}>
      <div className={`${activePage === 2 ? 'active-nav' : ''} pointer`} onClick={() => goToMyOrders()}>
        <i
          data-feather="image"
          data-feather-line="1"
          data-feather-size="21"
          data-feather-color="green1-dark"
          data-feather-bg="green1-fade-light"
        />
        <span>سفارشات من</span>
      </div>

      <div className={`${activePage === 1 ? 'active-nav' : ''} pointer`} onClick={(e) => goToHome()}>
        <i
          data-feather="home"
          data-feather-line="1"
          data-feather-size="21"
          data-feather-color="blue2-dark"
          data-feather-bg="blue2-fade-light"
        />
        <span>خانه</span>
      </div>

      <div className={`${activePage === 3 ? 'active-nav' : ''} pointer`} onClick={(e) => goToProfile()}>
        <i
          data-feather="file"
          data-feather-line="1"
          data-feather-size="21"
          data-feather-color="brown1-dark"
          data-feather-bg="brown1-fade-light"
        />
        <span>حساب کاربری</span>
      </div>
    </div>
  );
};

export default FooterCard;
