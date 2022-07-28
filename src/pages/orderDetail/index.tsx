import Footer from '@src/layout/Footer';
import FooterCard from '@src/layout/FooterCard';
import HeaderCard from '@src/layout/HeaderCard';
import { CustomFunctions } from '@src/utils/custom';
import { FunctionComponent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_MY_ORDERS, URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '../../configs/urls';

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
            <h2>
              <a href="#" onClick={() => navigate(URL_MY_ORDERS)}>
                <i className="fa fa-arrow-right mx-2"></i>
                بازگشت
              </a>
            </h2>
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
                        <audio
                          src="https://irsv.upmusics.com/Downloads/Musics/Meysam%20Ebrahimi%20%7C%20Roshan%20Kon%20(320).mp3"
                          controls
                        />
                      </div>
                      <div style={{ display: 'block' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <video
                            width="320"
                            height="240"
                            controls
                            style={{ display: 'flex', alignContent: 'center' }}
                            src="https://jadvalyab.ir/blog/wp-content/uploads/2020/04/%D8%A7%D8%B4%D9%88%D8%A7%D9%86.mp4?_=1"
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'inherit', flexWrap: 'wrap' }}>
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                          <img className="m-2" src={require('/src/scss/images/ath.png')} />
                        </div>
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
          {/* footer */}
          <div
            className="card "
            style={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="area-1 m-3">
              <div className="m-2" style={{ alignItems: 'inherit' }}>
                <i className="fa fa-list"></i>
                <p>شرح اقدامات</p>
              </div>
              <div className="">
                <div className="">
                  <div className="col-5">1- هزینه ایاب و ذهاب</div>
                  <div className="col-2">70.000</div>
                  <div className="col-2">
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="col-3">نقدی</div>
                </div>
                <div className="">
                  <div className="col-5">2- تعمیر یخچال</div>
                  <div className="col-2">100.000</div>
                  <div className="col-2">
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="col-3">گارانتی</div>
                </div>
                <div className="">
                  <div className="col-5">3- نصب تلیویزیون </div>
                  <div className="col-2">
                    <div style={{ textDecoration: 'line-through', color: 'red' }}>70.000</div>
                    <span className="p-1">50.000</span>
                  </div>
                  <div className="col-2">
                    <i className="fa fa-hourglass"></i>
                  </div>
                  <div className="col-3">
                    <Button className="btn btn-success">پرداخت</Button>
                  </div>
                </div>
              </div>
            </div>
            <section className="box4">
              <Button className="btn btn-3d btn-m btn-full mb-3 rounded-xs text-uppercase font-700 shadow-s  border-blue-dark bg-blue-light">
                تسویه حساب <span className="fa-fw select-all fas"></span>
              </Button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
