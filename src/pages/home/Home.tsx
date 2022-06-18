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
import { APIURL_GET_ADVERTISE, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';
import { IAdvertiseResultModel } from '@src/models/output/advertise/IAdvertiseResultModel';
import { useTranslation } from 'react-i18next';


const Home: FunctionComponent<IPageProps> = (props) => {
  const [services, setServices] = useState<any>();
  const [advertise, setAdvertise] = useState<any>([]);
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const navigate = useNavigate();

  const GetServices = (cityId: number) => {
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
      });
  };

  const GetAdvertise = () => {
    httpRequest
      .getRequest<IOutputResult<IAdvertiseResultModel[]>>(
        // APIURL_GET_ADVERTISE
        'http://127.0.0.1:2500/GetAdvertise'
      )
      .then((result) => {
        setAdvertise(result.data.data);
      });
  };

  useEffect(() => {
    GetServices(2);
    GetAdvertise();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    var splide = document.getElementsByClassName('splide');
    if (splide.length) {
      debugger;
      var doubleSlider = document.querySelectorAll('.double-slider');
      if (doubleSlider.length) {
        doubleSlider.forEach(function (e) {
          var double = new Splide('#' + e.id, {
            type: 'loop',
            direction: 'rtl',
            autoplay: true,
            interval: 4000,
            arrows: false,
            perPage: 2,
          }).mount();
        });
      }
    }
  }, [advertise]);
  return (
    <>
      <div id="page">
        <Footer footerMenuVisible={true} activePage={1} />

        <div className="page-content" style={{ paddingBottom: '0' }}>
          <Header
            // showMainMenu={(e: any) => props.showMainMenu(true)}
            headerTitle={'Welcome'}
          />
   
          {/* Start Ads */}
          {!!advertise &&
            advertise.length > 0 &&
            advertise.map((items: IAdvertiseResultModel[]) => {
              debugger
              return (
                <div className="splide double-slider visible-slider slider-no-arrows slider-no-dots" id="double-slider-2">
                  <div className="splide__track">
                    <div className="splide__list">
                      {!!items &&
                        items.map((item: IAdvertiseResultModel) => {
                          debugger;
                          return (
                            <div className="splide__slide ps-3">
                              <div className="bg-theme pb-3 rounded-m shadow-l text-center overflow-hidden">
                                <div
                                  data-card-height="150"
                                  className="card mb-2 bg-29"
                                  style={{ backgroundImage: `${BASE_URL}/` + item.imageUrl }}
                                >
                                  <h5 className="card-bottom color-white mb-2">{item.title}</h5>
                                  <div className="card-overlay bg-gradient"></div>
                                </div>
                                <p className="mb-3 ps-2 pe-2 pt-2 font-12">{item.description}</p>
                                <a
                                  onClick={() => navigate(`${BASE_URL}/${item.addressUrl}`)}
                                  href="#"
                                  className="btn btn-xs bg-highlight btn-center-xs rounded-s shadow-s text-uppercase font-700"
                                >
                                  مشاهده
                                </a>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          {/* End Adds */}
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
                    src={`${BASE_URL}/${item.backGroundUrl}`}
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
          <FooterCard footerMenuVisible={true} />
        </div>
      </div>
    </>
  );
};

export default Home;
