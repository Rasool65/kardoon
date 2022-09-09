import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_ADVERTISE, APIURL_GET_CATEGORIES, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';
import { IAdvertiseResultModel } from '@src/models/output/advertise/IAdvertiseResultModel';
import { useTranslation } from 'react-i18next';
import { ICategory } from '@src/models/output/productCategory/ICategory';
import { URL_CITY, URL_MAIN, URL_PRODUCTS } from './../../configs/urls';

// import Header from './Header';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { Spinner } from 'reactstrap';
import { init_template } from './template';
import MainMenuModal from '@src/layout/MainMenuModal';
import Header from '../../layout/Header';

const Category: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootStateType) => state.authentication.isAuthenticate);
  const cityId = auth
    ? useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId)
    : localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city')!).value
    : navigate(URL_CITY);

  const [advertise, setAdvertise] = useState<any>([]);
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();
  const GetAdvertise = () => {
    httpRequest.getRequest<IOutputResult<IAdvertiseResultModel[]>>(APIURL_GET_ADVERTISE).then((result) => {
      setAdvertise(result.data.data);
    });
  };

  const GetCategories = () => {
    state && state.ServiceTypeId
      ? (setLoading(true),
        httpRequest
          .getRequest<IOutputResult<ICategory>>(`${APIURL_GET_CATEGORIES}/?CityId=${cityId}&ServiceTypeId=${state.ServiceTypeId}`)
          .then((result) => {
            setCategories(result.data.data);
            setLoading(false);
          })
          .finally(() => setLoading(false)))
      : navigate(URL_MAIN);
  };

  useEffect(() => {
    GetAdvertise();
    GetCategories();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    init_template();
  }, [advertise, categories]);

  return (
    <>
      {auth && <MainMenuModal />}
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={1} /> */}
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
            <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'space-around' }}>
              <Spinner />
            </div>
          ) : (
            <div className="row" style={{ margin: '30px 10px 20px 10px' }}>
              {!!categories &&
                categories.length > 0 &&
                categories.map((item: ICategory, index: number) => {
                  return (
                    <div className="col-6" style={{ padding: '0 0 0 0' }}>
                      <div
                        style={{
                          backgroundImage: `url(${item.backgroundImageUrl})`,
                          cursor: 'pointer',
                          margin: '0 8px 16px 8px',
                        }}
                        className="card card-style bg-10"
                        data-card-height="250"
                        onClick={() => {
                          navigate(URL_PRODUCTS, {
                            state: {
                              ProductCategoryId: item.id,
                              ServiceTypeId: state.ServiceTypeId,
                            },
                          });
                        }}
                      >
                        <div className="card-center text-uppercase ps-3">
                          <img className="color-white mb-0 pb-2 font-11" style={{ width: '100px' }} src={item.logoUrl} />

                          <h1 className="color-white fa-5x pb-3">{item.id}</h1>
                          <h6 className="color-white pt-1">{item.name}</h6>
                        </div>
                        {/* <div className="card-bottom ps-3">
                          <p className="color-white mb-0 pb-2 font-11">{item.logoUrl}</p>
                        </div> */}
                        <div className="card-overlay bg-black opacity-90"></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* <FooterCard footerMenuVisible={true} /> */}
        </div>
      </div>
    </>
  );
};

export default Category;
