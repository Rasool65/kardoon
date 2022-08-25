import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
// import Header from './Header';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_HIERARCHICAL_DEVICE_TYPE } from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from '@src/utils/custom';
import { IProductsResultModel } from './../../models/output/products/IProductsResultModel';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { URL_CITY, URL_MAIN, URL_ORDER_DETAIL, URL_REQUEST_DETAIL } from '@src/configs/urls';
import { IProductTypeResultModel } from '@src/models/output/products/IProductTypeResultModel';
import { Spinner } from 'reactstrap';

const Products: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootStateType) => state.authentication.isAuthenticate);
  const cityId = auth
    ? useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId)
    : localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city')!).value
    : navigate(URL_CITY);
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();

  const GetProducts = () => {
    !!state
      ? (setLoading(true),
        httpRequest
          .getRequest<IOutputResult<IProductsResultModel[]>>(
            `${APIURL_GET_HIERARCHICAL_DEVICE_TYPE}?CityId=${cityId}&ProductCategoryId=${state.ProductCategoryId}&ServiceTypeId=${state.ServiceTypeId}`
          )
          .then((result) => {
            setProducts(result.data.data);
            setLoading(false);
          }))
      : navigate(URL_MAIN);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    CustomFunctions();
  }, [products]);

  const RecursiveComponent = ({ recProduct }: { recProduct: IProductsResultModel }) => {
    const hasSubProducts = recProduct.subProducts?.length! > 0;
    return (
      <>
        {hasSubProducts ? (
          <div className="card card-style shadow-0 bg-highlight mb-1">
            <button
              className="btn accordion-btn color-white no-effect"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${recProduct.id}`}
            >
              <i className="fa fa-star me-2"></i>
              {recProduct.name}
              <i className="fa fa-chevron-down font-10 accordion-icon"></i>
            </button>
            <div id={`collapse${recProduct.id}`} className="collapse bg-theme" data-bs-parent="">
              <div className="pt-3 pb-3">
                <p className="mb-0">
                  {hasSubProducts &&
                    recProduct.subProducts?.map((item: IProductsResultModel, index: number) => (
                      <RecursiveComponent recProduct={item} />
                    ))}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            style={{ width: '100%', marginTop: '30px' }}
            className="btn btn-m mt-4 mb-0 btn-full bg-green-dark rounded-sm text-uppercase font-900"
            onClick={() => {
              navigate(URL_REQUEST_DETAIL, {
                state: {
                  ProductId: recProduct.id,
                  ServiceTypeId: state.ServiceTypeId,
                },
              });
            }}
          >
            {recProduct.name}
          </button>
        )}
      </>
    );
  };
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
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Spinner />
              </div>
            ) : (
              <div className="accordion mt-4" id="accordion-2">
                {!!products &&
                  products.length > 0 &&
                  products.map((items: IProductsResultModel, index: number) => {
                    return (
                      <>
                        <RecursiveComponent recProduct={items} />
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          {/* <FooterCard footerMenuVisible={true} /> */}
        </div>
      </div>
    </>
  );
};

export default Products;
