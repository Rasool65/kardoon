import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
// import useHttpRequest from '@src/hooks/useHttpRequest';
// import About from './About';
// import { Link } from 'react-router-dom';
// import { URL_DASHBOARD, URL_LOGIN } from '@src/configs/urls';
// import { RootStateType } from '@src/redux/Store';
import { Col, Container, Row } from 'reactstrap';
import FooterCard from '@src/layout/FooterCard';

const Home: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div id="page">
        {/* <Footer footerMenuVisible={props.footerMenuVisible} activePage={1}/> */}

        <div className="page-content">
          {/* <HomeHeader showMainMenu={(e) => props.showMainMenu(true)} headerTitle={"خوش آمدید"}/> */}

          <div className="single-slider-boxed text-center owl-no-dots owl-carousel" style={{ marginTop: '50px' }}>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/005.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/006.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/007.jpg')} />
            </div>
          </div>

          <div className="single-slider-boxed text-center owl-no-dots owl-carousel">
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/006.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/005.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/public/forTest/006.jpg')} />
            </div>
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/1.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">نصب و راه اندازی</h1>
                <p className="color-white text-end opacity-50 mb-2">نصب و راه اندازی</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/2.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/3.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">سرویس دوره ای</h1>
                <p className="color-white text-end opacity-50 mb-2">سرویس دوره ای</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/4.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">گارانتی</h1>
                <p className="color-white text-end opacity-50 mb-2">گارانتی</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/5.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div className="card card-style  me-0 ms-0 rounded-0 gradient-blue">
            <div className="content pt-5 pb-5">
              <h1 className="mb-1 color-white font-700 text-center">گارانتی کاردون</h1>
              <p className="boxed-text-xl color-white opacity-80">
                کاردون برای تمامی برندهای معتبر ایرانی و خارجی گارانتی ارائه می‌دهد. از لوازم خانگی‌تان با هزینه‌ای به صرفه در
                برابر خرابی‌ها و حوادث احتمالی حفاظت کنید. برندهای سامسونگ، ال جی، سونی، بوش، دوو، AEG، کنوود و هر برند معتبر
                ایرانی و خارجی دیگری را می‌توانید با کاردون گارانتی کنید.
              </p>
              <a href="#" className="btn btn-s bg-white color-black font-700 btn-center-m">
                ثبت گارانتی محصول
              </a>
            </div>
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/6.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/7.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/8.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/9.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          <div
            className="card card-style card-blur pointer"
            data-card-height="155"
            //  onClick={(e) => onClickHandle(e)}
          >
            <img src="images/pictures/10.jpg" className="card-image" alt="" />
            <div className="card-top">{/*<i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/>*/}</div>
            <div className="card-bottom">
              <div className="float-end me-3">
                <h1 className="color-white font-700 text-end mb-n1">تعمیرات</h1>
                <p className="color-white text-end opacity-50 mb-2">تعمیرات</p>
              </div>
            </div>
            <div className="card-overlay bg-black opacity-30" />
          </div>

          {/*<div className="card service-card-style" onClick={(e) => onClickHandle(e)}>*/}
          {/*    <Container>*/}
          {/*        <Row style={{alignItems: 'center', textAlign: 'center', marginBottom: '0'}}>*/}
          {/*            <Col style={{height: '100%'}}>*/}
          {/*                <span style={{marginLeft: '10px', color: '#000'}}>نصب و راه اندازی</span>*/}
          {/*            </Col>*/}
          {/*            <Col style={{textAlign: 'left', margin: '10px'}}>*/}
          {/*                <img*/}
          {/*                    src="images/forTest/install.jpg"*/}
          {/*                    style={{width: '120px', height: '100px', margin: '1px'}} alt=""/>*/}
          {/*            </Col>*/}
          {/*        </Row>*/}
          {/*    </Container>*/}
          {/*</div>*/}
          {/*<div className="card service-card-style" onClick={(e) => onClickHandle(e)}>*/}
          {/*    <Container>*/}
          {/*        <Row style={{alignItems: 'center', textAlign: 'center', marginBottom: '0'}}>*/}
          {/*            <Col style={{height: '100%'}}>*/}
          {/*                <span style={{marginLeft: '10px', color: '#000'}}>تعمیرات</span>*/}
          {/*            </Col>*/}
          {/*            <Col style={{textAlign: 'left', margin: '10px'}}>*/}
          {/*                <img*/}
          {/*                    src="images/forTest/install.jpg"*/}
          {/*                    style={{width: '120px', height: '100px', margin: '1px'}} alt=""/>*/}
          {/*            </Col>*/}
          {/*        </Row>*/}
          {/*    </Container>*/}
          {/*</div>*/}
          {/*<div className="card service-card-style" onClick={(e) => onClickHandle(e)}>*/}
          {/*    <Container>*/}
          {/*        <Row style={{alignItems: 'center', textAlign: 'center', marginBottom: '0'}}>*/}
          {/*            <Col style={{height: '100%'}}>*/}
          {/*                <span style={{marginLeft: '10px', color: '#000'}}>سرویس دوره ای</span>*/}
          {/*            </Col>*/}
          {/*            <Col style={{textAlign: 'left', margin: '10px'}}>*/}
          {/*                <img*/}
          {/*                    src="images/forTest/install.jpg"*/}
          {/*                    style={{width: '120px', height: '100px', margin: '1px'}} alt=""/>*/}
          {/*            </Col>*/}
          {/*        </Row>*/}
          {/*    </Container>*/}
          {/*</div>*/}
          {/*<div className="card service-card-style" onClick={(e) => onClickHandle(e)}>*/}
          {/*    <Container>*/}
          {/*        <Row style={{alignItems: 'center', textAlign: 'center', marginBottom: '0'}}>*/}
          {/*            <Col style={{height: '100%'}}>*/}
          {/*                <span style={{marginLeft: '10px', color: '#000'}}>گارانتی</span>*/}
          {/*            </Col>*/}
          {/*            <Col style={{textAlign: 'left', margin: '10px'}}>*/}
          {/*                <img*/}
          {/*                    src="images/forTest/install.jpg"*/}
          {/*                    style={{width: '120px', height: '100px', margin: '1px'}} alt=""/>*/}
          {/*            </Col>*/}
          {/*        </Row>*/}
          {/*    </Container>*/}
          {/*</div>*/}
          {/*<div style={{marginBottom: '30px'}}*/}
          {/*     className="card service-card-style" onClick={(e) => onClickHandle(e)}>*/}
          {/*    <Container>*/}
          {/*        <Row style={{alignItems: 'center', textAlign: 'center', marginBottom: '0'}}>*/}
          {/*            <Col style={{height: '100%'}}>*/}
          {/*                <span style={{marginLeft: '10px', color: '#000'}}>نصب و راه اندازی</span>*/}
          {/*            </Col>*/}
          {/*            <Col style={{textAlign: 'left', margin: '10px'}}>*/}
          {/*                <img*/}
          {/*                    src="images/forTest/install.jpg"*/}
          {/*                    style={{width: '120px', height: '100px', margin: '1px'}} alt=""/>*/}
          {/*            </Col>*/}
          {/*        </Row>*/}
          {/*    </Container>*/}
          {/*</div>*/}

          <FooterCard />
        </div>
      </div>
    </>
  );
};

export default Home;
