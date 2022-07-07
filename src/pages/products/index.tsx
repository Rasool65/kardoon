import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
// import Header from './Header';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import {
  APIURL_GET_ADVERTISE,
  APIURL_GET_DEVICE_TYPE,
  APIURL_GET_PRODUCTS,
  APIURL_GET_PRODUCTS_BRAND,
  APIURL_GET_SERVICES,
} from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from '@src/utils/custom';
import { IProductsResultModel } from './../../models/output/products/IProductsResultModel';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { URL_MAIN, URL_ORDER_DETAIL } from '@src/configs/urls';
import { IProductTypeResultModel } from '@src/models/output/products/IProductTypeResultModel';

const Products: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const [products, setProducts] = useState<any>();
  const [deviceType, setDeviceType] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();

  const GetProducts = () => {
    !!state
      ? httpRequest
          .getRequest<IOutputResult<IProductsResultModel[]>>(
            `${APIURL_GET_PRODUCTS}?CityId=${cityId}&ProductCategoryId=${state.ProductCategoryId}&ServiceTypeId=${state.ServiceTypeId}`
          )
          .then((result) => {
            setProducts(result.data.data);
          })
      : navigate(URL_MAIN);
  };
  const GetDeviceType = (ProductCategoryId: number) => {
    httpRequest
      .getRequest<IOutputResult<IProductTypeResultModel[]>>(
        `${APIURL_GET_DEVICE_TYPE}?CityId=${cityId}&ProductCategoryId=${ProductCategoryId}&ServiceTypeId=${state.ServiceTypeId}`
      )
      .then((result) => {
        setDeviceType(result.data.data);
      });
  };

  useEffect(() => {
    GetProducts();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    CustomFunctions();
  }, [products, deviceType]);

  return (
    <>
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={1} /> */}
        <div className="page-content" style={{ paddingBottom: '0' }}>
          <div className="card card-style">
            <div className="content">
              <h4>{t('SelectProduct')}</h4>
              <p>{t('PleaseSelectProduct')}</p>
            </div>
            <div className="accordion mt-4" id="accordion-2">
              {!!products &&
                products.length > 0 &&
                products.map((items: IProductsResultModel, index: number) => {
                  return (
                    <>
                      <div className="card card-style shadow-0 bg-highlight mb-1">
                        <button
                          className="btn accordion-btn color-white no-effect"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${items.id}`}
                          onClick={() => {
                            GetDeviceType(items.id ? items.id : 0);
                          }}
                        >
                          {/*<img src={`${items.logoUrl}`} alt="logo" className="fa-3x float-start ms-3 mt-3" />*/}
                          <img src={`${items.logoUrl}`} />
                          {items.name}
                          <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id={`collapse${items.id}`} className="collapse bg-theme" data-bs-parent="#accordion-2">
                          <div className="pt-3 pb-3">
                            <p className="mb-0 " style={{ color: 'currentcolor' }}>
                              نوع {items.name} خود را انتخاب نمایید
                            </p>
                          </div>
                          {!!deviceType ? (
                            deviceType.map((items: IProductTypeResultModel, index: number) => {
                              debugger;
                              return (
                                <button
                                  style={{ width: '100%', marginTop: '30px' }}
                                  className="btn btn-m mt-4 mb-0 btn-full bg-green-dark rounded-sm text-uppercase font-900"
                                  onClick={() => {
                                    navigate(URL_ORDER_DETAIL, {
                                      state: {
                                        ProductId: items.id,
                                        ServiceTypeId: state.ServiceTypeId,
                                      },
                                    });
                                  }}
                                >
                                  {items.name}
                                </button>
                              );
                            })
                          ) : (
                            <p>نوع محصول وجود ندارد</p>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          {/* <FooterCard footerMenuVisible={true} /> */}
        </div>
      </div>
    </>
  );
};

export default Products;
