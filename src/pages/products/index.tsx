import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import FooterCard from '@src/layout/FooterCard';
import Footer from '@src/layout/Footer';
// import Header from './Header';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_GET_ADVERTISE, APIURL_GET_SERVICES } from '@src/configs/apiConfig/apiUrls';
import { useTranslation } from 'react-i18next';
import { CustomFunctions } from '@src/utils/custom';
import { IProductsResultModel } from './../../models/output/products/IProductsResultModel';

const Products: FunctionComponent<IPageProps> = (props) => {
  const [products, setProducts] = useState<any>();
  const httpRequest = useHttpRequest();
  const { t }: any = useTranslation();
  const { state }: any = useLocation();

  const GetProducts = () => {
    const body = state;
    httpRequest
      .postRequest<IOutputResult<IProductsResultModel[]>>(
        APIURL_GET_ADVERTISE,
        // 'http://127.0.0.1:2500/getProducts',
        body
      )
      .then((result) => {
        setProducts(result.data.data);
      });
  };

  useEffect(() => {
    GetProducts();
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    CustomFunctions();
  }, [products]);

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
                        >
                          <i className={`fa ${items.icon} me-2`}></i>
                          {items.title}
                          <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id={`collapse${items.id}`} className="collapse bg-theme" data-bs-parent="#accordion-2">
                          <div className="pt-3 pb-3">
                            <p className="mb-0">
                              ثبت سفارش را با تعيين نوع خدمت درخواستي، محل، زمان مراجعه متخصص کاردون انجام دهيد. بعد از تاييد
                              سفارش، متخصصين مورد نظر اعلام آمادگي مي کنند و شما متخصص مورد نظر خود را انتخاب مي کنيد و در صورت
                              نياز به مواد اوليه و قطعات جهت درخواست، حتما فاکتور معتبر از متخصص بخواهید. شما میتوانید از بخش
                              «سفارشات من» روند درخواست خود را پيگيري کنيد. حتما قبل از شروع به کار در خصوص هزینه سفارش از متخصص
                              سوال کنید!
                            </p>
                          </div>
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
