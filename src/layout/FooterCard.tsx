import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const FooterCard: FunctionComponent = () => {
  const { t }: any = useTranslation();

  return (
    <div className="footer">
      <div className="footer card card-style mx-0 mb-0" style={{ paddingBottom: '25px' }}>
        <div className="footer-title pt-4" style={{ marginTop: '10px' }}>
          <img className="mb-3" src={require('/public/images/forTest/logo_png.png')} alt="logo_png" width="200" />
        </div>
        <span className="icon-center" style={{ marginTop: '10px' }}>
          {t('Services')}
        </span>
        <div className="text-center mb-3" style={{ marginTop: '30px' }}>
          <div className="icon icon-xs rounded-sm shadow-l mr-1 bg-facebook pointer">
            <i className="fab fa-facebook-f" />
          </div>
          <div className="icon icon-xs rounded-sm shadow-l mr-1 bg-twitter pointer">
            <i className="fab fa-twitter" />
          </div>
          <div className="icon icon-xs rounded-sm shadow-l mr-1 bg-phone pointer">
            <i className="fa fa-phone" />
          </div>
          <div data-menu="menu-share" className="icon icon-xs rounded-sm mr-1 shadow-l bg-red2-dark pointer">
            <i className="fa fa-share-alt" />
          </div>
          {/* <div className="back-to-top icon icon-xs rounded-sm shadow-l bg-highlight color-white pointer">
            <i className="fa fa-arrow-up" />
          </div> */}
        </div>
        <div
          onClick={() => window.open('tel:02147100')}
          className="btn btn-full btn-margins rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
          style={{ direction: 'ltr', marginTop: '10px' }}
        >
          ۰۲۱ - ۴۷۱۰۰
        </div>
      </div>
      <div className="footer-card card shape-rounded bg-20" style={{ height: '230px' }}>
        <div className="card-overlay bg-highlight opacity-90" />
      </div>
    </div>
  );
};

export default FooterCard;
