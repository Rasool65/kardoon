import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '../../configs/urls';
import OrderDetailReport from '../orderDetailReport';
import './style.scss';

const OrderDetail: FunctionComponent<IPageProps> = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  console.log(id); //12345

  const navigate = useNavigate();
  useEffect(() => {
    CustomFunctions();
  }, []);
  return (
    <>
      {/* <div className="card header-card shape-rounded" data-card-height="150">
        <div className="card-overlay bg-highlight opacity-95"></div>
        <div className="card-overlay dark-mode-tint"></div>
        <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
      </div> */}
      <Footer footerMenuVisible={true} activePage={1} />
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
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>

          <div className="card card-style header-order">
            <div className="card-body">
              <div className="">
                <div className=" col-6">شماره درخواست:</div>
                <div className=" col-6 justify-content-end">220706001</div>
              </div>
              <div className="">
                <div className=" col-6">تهران-تهران</div>
                <div className=" col-6 justify-content-end">شنبه 1401/5/15-عصر</div>
              </div>
            </div>
          </div>
          <div className="card card-style">
            <div className="accordion mt-4" id="accordion-2">
              <div className="card card-style shadow-0 bg-highlight mb-1">
                <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse5">
                  <div>
                    <div className=" col-6">تعمیر کولر گازی</div>
                    <div className=" col-5">
                      <span className="bg-success">بسته</span>
                    </div>
                    <div className=" col-1">
                      <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                    </div>
                  </div>
                </button>
                <div
                  style={{ backgroundColor: 'white' }}
                  id="collapse5"
                  className="collapse bg-theme accordion-open"
                  data-bs-parent="#accordion-2"
                >
                  <div>
                    <div>
                      <div>
                        <div className="col-6">برند</div>
                        <div className="col-6">سامسونگ</div>
                      </div>
                      <div>
                        <div className="col-6">مدل</div>
                        <div className="col-6">RC745Z</div>
                      </div>
                      <div>
                        <div className="col-6">سریال</div>
                        <div className="col-6">ROWK72325</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p style={{ marginBottom: '0' }}>علت درخواست:</p>
                      </div>
                      <div>
                        <ul>
                          <li>عدم سرمایش کافی</li>
                          <li>ریموت خراب است</li>
                        </ul>
                      </div>
                      <div>
                        <audio src="" controls></audio>
                      </div>
                      <div>
                        <i className="fa fa-play"></i>
                        <i className="fa fa-image"></i>
                        <i className="fa fa-image"></i>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>نام تکنسین:</p>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>حسین کعبی</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>ناصر قاجاری</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-style shadow-0 bg-highlight mb-1">
                <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse6">
                  <div>
                    <div className=" col-5">نصب تلیویزیون</div>
                    <div className=" col-6">
                      <span className="bg-warning">در حال انجام</span>
                    </div>
                    <div className=" col-1">
                      <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                    </div>
                  </div>
                </button>
                <div
                  style={{ backgroundColor: 'white' }}
                  id="collapse6"
                  className="collapse bg-theme accordion-open"
                  data-bs-parent="#accordion-2"
                >
                  <div className="pt-3 pb-3">
                    <div>
                      <div>
                        <div className="col-6">برند</div>
                        <div className="col-6">سامسونگ</div>
                      </div>
                      <div>
                        <div className="col-6">مدل</div>
                        <div className="col-6">RC745Z</div>
                      </div>
                      <div>
                        <div className="col-6">سریال</div>
                        <div className="col-6">ROWK72325</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p style={{ marginBottom: '0px' }}>علت درخواست:</p>
                      </div>
                      <div>
                        <ul>
                          <li>عدم سرمایش کافی</li>
                          <li>ریموت خراب است</li>
                        </ul>
                      </div>
                      <div>
                        <audio src="" controls></audio>
                      </div>
                      <div>
                        <i className="bi bi-play-btn"></i>
                        <i className="bi bi-card-image"></i>
                        <i className="bi bi-card-image"></i>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>نام تکنسین:</p>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>حسین کعبی</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>ناصر قاجاری</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-style shadow-0 bg-highlight mb-1">
                <button className="btn accordion-btn color-white no-effect" data-bs-toggle="collapse" data-bs-target="#collapse1">
                  <div>
                    <div className=" col-5">نصب تلیویزیون</div>
                    <div className=" col-6">
                      <span className="bg-danger">معلق</span>
                    </div>
                    <div className=" col-1">
                      <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                    </div>
                  </div>
                </button>
                <div
                  style={{ backgroundColor: 'white' }}
                  id="collapse1"
                  className="collapse bg-theme accordion-open"
                  data-bs-parent="#accordion-2"
                >
                  <div className="pt-3 pb-3">
                    <div>
                      <div>
                        <div className="col-6">برند</div>
                        <div className="col-6">سامسونگ</div>
                      </div>
                      <div>
                        <div className="col-6">مدل</div>
                        <div className="col-6">RC745Z</div>
                      </div>
                      <div>
                        <div className="col-6">سریال</div>
                        <div className="col-6">ROWK72325</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p style={{ marginBottom: '0px' }}>علت درخواست:</p>
                      </div>
                      <div>
                        <ul>
                          <li>عدم سرمایش کافی</li>
                          <li>ریموت خراب است</li>
                        </ul>
                      </div>
                      <div>
                        <audio src="" controls></audio>
                      </div>
                      <div>
                        <i className="bi bi-play-btn"></i>
                        <i className="bi bi-card-image"></i>
                        <i className="bi bi-card-image"></i>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>نام تکنسین:</p>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>حسین کعبی</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                      <div>
                        <div className="col-6">
                          <p>ناصر قاجاری</p>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-phone"></i>
                          <i className="fa fa-message"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* شرح اقدامات */}
          <div className="card card-style">
            <i className="fa fa-list-ul font-20 m-2"> شرح اقدامات</i>
            <div className="m-1" style={{ display: 'flex', marginRight: '10px', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex' }}>1.هزینه ایاب و ذهاب</div>
              <div>70.000</div>
              <div>
                <i className="fa fa-check font-15"> نقدی</i>
              </div>
            </div>
            <div className="m-1" style={{ display: 'flex', marginRight: '10px', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex' }}>2.تعمیر یخچال</div>
              <div>100.000</div>
              <div>
                <i className="fa fa-check font-15"> گارانتی</i>
              </div>
            </div>
            <div className="m-1" style={{ display: 'flex', marginRight: '10px', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex' }}>3.نصب تلیویزیون دیواری</div>
              <div>200.000</div>
              <div>
                <i className="fa fa-hourglass-half font-15"> پرداخت</i>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button>پرداخت آنلاین</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
