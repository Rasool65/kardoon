import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
import Header from '../../layout/Header';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IServicesResultModel } from '@src/models/output/services/IServicesResultModel';
import { APIURL_GET_ADVERTISE, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { IAdvertiseResultModel } from '@src/models/output/advertise/IAdvertiseResultModel';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';

import { URL_CATEGORIES } from '@src/configs/urls';
import { Spinner } from 'reactstrap';
import { URL_CITY } from './../../configs/urls';
import { init_template } from './template';
import MainMenuModal from '@src/layout/MainMenuModal';
import { CustomFunctions } from '@src/utils/custom';

const Main: FunctionComponent<IPageProps> = (props) => {
  const [services, setServices] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [advertise, setAdvertise] = useState<any>([]);
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const auth = useSelector((state: RootStateType) => state.authentication.isAuthenticate);

  const cityId = auth
    ? useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId)
    : localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city')!).value
    : navigate(URL_CITY);

  const GetServices = (cityId: number) => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<IServicesResultModel>>(`${APIURL_GET_SERVICES}?CityId=${cityId}`).then((result) => {
      setServices(result.data.data);
      setLoading(false);
    });
  };

  const GetAdvertise = () => {
    httpRequest.getRequest<IOutputResult<IAdvertiseResultModel[]>>(APIURL_GET_ADVERTISE).then((result) => {
      setAdvertise(result.data.data);
    });
  };

  useEffect(() => {
    GetServices(cityId ? cityId : 0);
    GetAdvertise();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    // CustomFunctions();
    init_template();
  }, [advertise, services]);

  return (
    <>
      {auth && <MainMenuModal />}
      <div id="page">
        {/* <div
          id="menu-main"
          className="menu menu-box-right menu-box-detached rounded-m"
          data-menu-width="260"
          data-menu-load="menu-main.html"
          data-menu-active="nav-settings"
          data-menu-effect="menu-over"
        ></div> */}
        <Footer footerMenuVisible={true} activePage={2} />

        <Header headerTitle={props.title} />
        <div className="page-content" style={{ paddingBottom: '0' }}>
          {!!advertise &&
            advertise.length > 0 &&
            advertise.map((items: IAdvertiseResultModel[], index: number) => {
              return (
                <div
                  style={{ marginTop: '30px' }}
                  className="splide double-slider visible-slider slider-no-arrows slider-no-dots"
                  id={`double-slider-${index}`}
                >
                  <div className="splide__track">
                    <div className="splide__list">
                      {!!items &&
                        items.map((item: IAdvertiseResultModel) => {
                          return (
                            <div className="splide__slide ps-3">
                              <div className="bg-theme pb-3 rounded-m shadow-l text-center overflow-hidden">
                                <div
                                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                                  data-card-height="150"
                                  className="card mb-2"
                                >
                                  <h5 className="card-bottom color-white mb-2">{item.title}</h5>
                                  <div className="card-overlay bg-gradient"></div>
                                </div>
                                <p className="mb-3 ps-2 pe-2 pt-2 font-12">{item.summary}</p>
                                <a
                                  //  href={`${BASE_URL}${item.addressUrl}`}
                                  href={item.hrefUrl}
                                  target={item.targetUrl}
                                  className="btn btn-xs bg-highlight btn-center-xs rounded-s shadow-s text-uppercase font-700"
                                >
                                  {t('View')}
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
          {loading ? (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
              <Spinner />
            </div>
          ) : (
            !!services &&
            services?.length > 0 &&
            services.map((item: IServicesResultModel, id: number) => {
              return (
                <div
                  style={{ marginTop: '30px' }}
                  className="card card-style card-blur pointer"
                  data-card-height="155"
                  onClick={(e) =>
                    navigate(URL_CATEGORIES, {
                      state: {
                        ServiceTypeId: item.id,
                      },
                    })
                  }
                >
                  <img key={id} src={item.backgroundUrl} className="card-image" alt={item.title} />
                  <div className="card-top">
                    <img width={100} src={item.icon} alt="logo" />
                    {/* <i className="fa fa-coffee color-brown-dark fa-3x float-start ms-3 mt-3" /> */}
                  </div>
                  <div className="card-bottom">
                    <div className="float-end me-3">
                      <h1 className="color-white font-700 text-end mb-n1">{item.title}</h1>
                      <p className="color-white text-end opacity-50 mb-2">{item.shortDescription}</p>
                    </div>
                  </div>
                  <div className="card-overlay bg-black opacity-30" />
                </div>
              );
            })
          )}

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
          <FooterCard footerMenuVisible={true} />
        </div>
      </div>
    </>
  );
};

export default Main;
