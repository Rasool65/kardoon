import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_ORDER_DETAIL_REPORT, URL_REQUEST_DETAIL } from '../../configs/urls';
import OrderDetailReport from '../orderDetailReport';

const Order: FunctionComponent<IPageProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <div id="page">
      {/* <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95"></div>
        <div className="card-overlay dark-mode-tint"></div>
        <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
      </div> */}
      <Footer footerMenuVisible={true} activePage={1} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button className="btn btn-success mb-5">سفارشات جاری</Button>
        <Button className="btn btn-success mb-5 float-end">سفارشات قبلی</Button>
      </div>
      <div className="card card-style">
        <div className="accordion" id="accordion-1">
          <div className="mb-0">
            <button
              style={{ backgroundColor: '#000eb7a1' }}
              className="btn accordion-btn no-effect color-theme"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
            >
              <div className="content">
                <h5 className="my-4">
                  شماره درخواست :<span>220706001</span>
                  <span className="float-end">
                    1401/05/02 <span style={{ border: 'solid red 1px', color: 'red' }}>SOS</span>
                  </span>
                </h5>
                {/* <span className="">تهران - شهران - کوچه اول - پلاک 1</span>
                <span className="float-end">یکشنبه 1401/04/26 - عصر</span> */}
                <div>
                  1. تعمیر یخچال ساید
                  <span className="float-end">درحال انجام</span>
                </div>
                <div>
                  2. نصب تلویزیون
                  <span className="float-end">معلق</span>
                </div>
              </div>
              <i className="fa fa-chevron-down font-10 accordion-icon"></i>
            </button>
            <div id="collapse2" className="collapse" data-bs-parent="#accordion-1">
              <div className="pt-1 pb-2 ps-3 pe-3 font-weight-bold">
                <div>
                  1. تعمیر یخچال ساید
                  <span className="float-end">درحال انجام</span>
                  <div>
                    برند : <span>سامسونگ</span>
                  </div>
                  <div>
                    مدل : <span>LC745</span>
                  </div>
                </div>
                <div>
                  2. نصب تلویزیون
                  <span className="float-end">معلق</span>
                </div>
                {/* <OrderDetailReport title="" /> */}
              </div>
            </div>
            <Button className="btn btn-success m-2">شرح اقدامات</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
