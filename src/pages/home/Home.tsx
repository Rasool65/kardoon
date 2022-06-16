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
import Footer from '@src/layout/Footer';
import Header from './Header';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IServicesResultModel } from '@src/models/output/services/IServicesResultModel';
import { APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';

const Home: FunctionComponent<IPageProps> = (props) => {
  const [services, setServices] = useState<any>();
  const httpRequest = useHttpRequest();
  const navigate = useNavigate();
  const GetServices = (cityId: number) => {
    debugger;
    const body = {
      cityId: cityId,
    };
    httpRequest
      .postRequest<IOutputResult<IServicesResultModel>>(
        // APIURL_GET_SERVICES,
        'http://127.0.0.1:2500/getService',
        body
      )
      .then((result) => {
        debugger;
        setServices(result.data.data);
        console.log(services);
      });
  };

  useEffect(() => {
    GetServices(1);
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div id="page">
        <Footer footerMenuVisible={true} activePage={1} />

        <div className="page-content">
          <Header
            // showMainMenu={(e: any) => props.showMainMenu(true)}
            headerTitle={'خوش آمدید'}
          />
          {/* //! Start Ads */}
          <div className="single-slider-boxed text-center owl-no-dots owl-carousel" style={{ marginTop: '50px' }}>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/005.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/006.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/007.jpg')} />
            </div>
          </div>
          <div className="single-slider-boxed text-center owl-no-dots owl-carousel">
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/006.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/005.jpg')} />
            </div>
            <div className="card rounded-l shadow-l" data-card-height="120">
              <div className="card-overlay" />
              <div className="card-bg owl-lazy" data-src={require('/src/scss/images/forTest/006.jpg')} />
            </div>
          </div>
          {/* //! End Adds */}
          {!!services &&
            services?.length > 0 &&
            services.map((item: IServicesResultModel, id: number) => {
              debugger;
              return (
                <div
                  className="card card-style card-blur pointer"
                  data-card-height="155"
                  onClick={(e) => navigate(`/${item.addressUrl}`)}
                >
                  <img
                    key={id}
                    src={`${BASE_URL}/${item.backgroundUrl}`}
                    // src={require('/public/images/pictures/1.jpg')}
                    className="card-image"
                    alt={item.title}
                  />
                  <div className="card-top">
                    <img src={`${BASE_URL}/${item.logo}`} alt="logo" className="fa-3x float-start ms-3 mt-3" />
                    {/* <i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3"/> */}
                  </div>
                  <div className="card-bottom">
                    <div className="float-end me-3">
                      <h1 className="color-white font-700 text-end mb-n1">{item.title}</h1>
                      <p className="color-white text-end opacity-50 mb-2">{item.subTitle}</p>
                    </div>
                  </div>
                  <div className="card-overlay bg-black opacity-30" />
                </div>
              );
            })}

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
