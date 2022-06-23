import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_ADVERTISE, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { BASE_URL } from '@src/configs/apiConfig/baseUrl';
import { IAdvertiseResultModel } from '@src/models/output/advertise/IAdvertiseResultModel';
import { useTranslation } from 'react-i18next';
import { ICategory } from '@src/models/output/productCategory/ICategory';
import { CustomFunctions } from '@src/utils/custom';

import { URL_PRODUCTS } from './../../configs/urls';
import Products from './../products/index';

import Header from './Header';

const Category: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const [advertise, setAdvertise] = useState<any>([]);
  const [categories, setCategories] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();

  const GetAdvertise = () => {
    httpRequest
      .getRequest<IOutputResult<IAdvertiseResultModel[]>>(
        APIURL_GET_ADVERTISE
        // 'http://127.0.0.1:2500/GetAdvertise'
      )
      .then((result) => {
        setAdvertise(result.data.data);
      });
  };
  const GetCategories = () => {
    httpRequest
      .getRequest<IOutputResult<ICategory>>(
        // APIURL_GET_ADVERTISE
        'http://127.0.0.1:2500/getCategory'
      )
      .then((result) => {
        setCategories(result.data.data);
      });
  };

  useEffect(() => {
    GetAdvertise();
    GetCategories();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    CustomFunctions();
  }, [advertise, categories]);

  return (
    <>
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={1} /> */}

        <div className="page-content" style={{ paddingBottom: '0' }}>
          <Header
            // showMainMenu={(e: any) => props.showMainMenu(true)}
            headerTitle={'دسته بندی ها'}
          />
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
                          debugger;
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

          <div className="row" style={{ margin: '30px 10px 20px 10px' }}>
            {!!categories &&
              categories.length > 0 &&
              categories.map((item: ICategory, index: number) => {
                debugger;
                return (
                  <div className="col-6" style={{ padding: '0 0 0 0' }}>
                    <div
                      style={{ backgroundImage: `url(${item.backGroundUrl})`, cursor: 'pointer', margin: '0 8px 16px 8px' }}
                      className="card card-style bg-10"
                      data-card-height="250"
                      onClick={() => {
                        navigate(URL_PRODUCTS, {
                          state: {
                            cityId: 1,
                            id: item.id,
                          },
                        });
                      }}
                    >
                      <div className="card-center text-uppercase ps-3">
                        <h1 className="color-white fa-5x pb-3">{item.id}</h1>
                        <h6 className="color-white pt-1">{item.title}</h6>
                      </div>
                      <div className="card-bottom ps-3">
                        <p className="color-white mb-0 pb-2 font-11">{item.title}</p>
                      </div>
                      <div className="card-overlay bg-black opacity-90"></div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <FooterCard footerMenuVisible={true} /> */}
        </div>
      </div>
    </>
  );
};

export default Category;