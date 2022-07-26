import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '../../configs/urls';
import OrderDetailReport from '../orderDetailReport';

const Order: FunctionComponent<IPageProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div id="page">
      <div className="page-content">
        <div className="page-title page-title-small">
          {/* <h2>
              <a href="#" data-back-button>
                <i className="fa fa-arrow-right"></i>
              </a>
              بازگشت
            </h2> */}
          {/* <a
              href="#"
              data-menu="menu-main"
              className="bg-fade-highlight-light shadow-xl preload-img"
              data-src="images/avatars/5s.png"
            ></a> */}
        </div>
        {/* <div className="card header-card shape-rounded" data-card-height="150">
          <div className="card-overlay bg-highlight opacity-95"></div>
          <div className="card-overlay dark-mode-tint"></div>
          <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
        </div> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button className="btn btn-success mb-5">سفارشات جاری</button>
          <button className="btn btn-success mb-5 float-end">سفارشات قبلی</button>
        </div>
        <Footer footerMenuVisible={true} activePage={1} />
        <div className="card card-style shadow-0 bg-highlight mb-1">
          <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse5">
            <div style={{ marginBottom: '20px' }}>
              شماره درخواست : <div> 220470051 </div>
              <div style={{ marginRight: 'auto' }}>1401/05/02</div>
              <div style={{ border: '2px solid red', color: 'red', marginRight: '10px' }}>SOS</div>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className="col-6">
                <div>1-</div>تعمیر کولر گازی
              </div>
              <div className="col-5">
                <span className="bg-success">بسته</span>
              </div>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className=" col-6">
                <div>2-</div> نصب تلویزیون
              </div>
              <div className="col-5">
                <span className="bg-warning">درحال انجام</span>
              </div>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className=" col-6">
                <div>3-</div> نصب تلویزیون
              </div>
              <div className="col-5">
                <span className="bg-danger">معلق</span>
              </div>
            </div>
            <i className="fa fa-chevron-down font-10 accordion-icon"></i>
          </button>
          <div
            style={{ backgroundColor: 'white' }}
            id="collapse5"
            className="collapse bg-theme accordion-open"
            data-bs-parent="#accordion-2"
          >
            <Button onClick={() => navigate(`${URL_ORDER_DETAIL}?id=2`)} style={{ width: 'inherit' }}>
              جزئیات بیشتر
            </Button>
          </div>
        </div>
        {/* End loop */}
        <div className="card card-style shadow-0 bg-highlight mb-1">
          <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse4">
            <div style={{ marginBottom: '20px' }}>
              شماره درخواست : <div> 22065365 </div>
              <div style={{ marginRight: 'auto' }}>1401/05/05</div>
              {/* <div style={{ border: '2px solid red', color: 'red', marginRight: '10px' }}>SOS</div> */}
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className="col-6">
                <div>1-</div>نصب گاز
              </div>
              <div className="col-5">
                <span className="bg-success">بسته</span>
              </div>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className=" col-6">
                <div>2-</div> نصب ماشین لباسشویی
              </div>
              <div className="col-5">
                <span className="bg-warning">درحال انجام</span>
              </div>
            </div>
            <i className="fa fa-chevron-down font-10 accordion-icon"></i>
          </button>
          <div
            style={{ backgroundColor: 'white' }}
            id="collapse4"
            className="collapse bg-theme accordion-open"
            data-bs-parent="#accordion-2"
          >
            <Button onClick={() => navigate(URL_ORDER_DETAIL)} style={{ width: 'inherit' }}>
              جزئیات بیشتر
            </Button>
          </div>
        </div>
        <div className="card card-style shadow-0 bg-highlight mb-1">
          <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse1">
            <div style={{ marginBottom: '20px' }}>
              شماره درخواست : <div> 2212060508 </div>
              <div style={{ marginRight: 'auto' }}>1401/05/07</div>
              <div style={{ border: '2px solid red', color: 'red', marginRight: '10px' }}>SOS</div>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <div className="col-6">
                <div>1-</div>نصب پکیج
              </div>
              <div className="col-5">
                <span className="bg-danger">معلق</span>
              </div>
            </div>
            <i className="fa fa-chevron-down font-10 accordion-icon"></i>
          </button>
          <div
            style={{ backgroundColor: 'white' }}
            id="collapse1"
            className="collapse bg-theme accordion-open"
            data-bs-parent="#accordion-2"
          >
            <Button onClick={() => navigate(URL_ORDER_DETAIL)} style={{ width: 'inherit' }}>
              جزئیات بیشتر
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
