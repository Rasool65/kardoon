import {
  APIURL_GET_PRODUCT_TYPES,
  APIURL_GET_SERVICES,
  APIURL_GET_TECHNICIAN_CONSUMERS,
  APIURL_GET_TECHNICIAN_MISSIONS,
} from '@src/configs/apiConfig/apiUrls';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IMissionsResultModel, ITechnicianMissionList } from '@src/models/output/mission/IMissionResultModel';
import { IServicesResultModel } from '@src/models/output/services/IServicesResultModel';
import { RootStateType } from '@src/redux/Store';
import { DateHelper } from '@src/utils/dateHelper';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { Button, Form, Input, Row, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { IEStatusId } from '@src/models/output/order/IOrderListResultModel';
import { URL_TECHNICIAN_MISSION_DETAIL } from '@src/configs/urls';
import { IProductTypeFilterResultModel } from '@src/models/output/products/IProductTypeResultModel';
import { ITechnicianConsumerResultModel } from '@src/models/output/mission/ITechnicianConsumerResultModel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPageListOutputResult } from '@src/models/output/IPageListOutputResult';
import PrevHeader from '@src/layout/PrevHeader';
import { init_template } from './template';

const TechnicianMission: FunctionComponent<IPageProps> = (props) => {
  const cityId = useSelector((state: RootStateType) => state.authentication.userData?.profile.residenceCityId);
  const TechnicianId = useSelector((state: RootStateType) => state.authentication.userData?.userId);
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const [services, setServices] = useState<any>();
  const [consumers, setConsumers] = useState<any>();
  const [productTypes, setProductTypes] = useState<any>();
  const [technicianMissionList, setTechnicianMissionList] = useState<ITechnicianMissionList[]>([]);
  const [withoutFilter, setWithout] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [serviceType, setServiceType] = useState<any>([]);
  const [productType, setProductType] = useState<any>([]);
  const [consumer, setConsumer] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [status, setStatus] = useState<any>([]);
  const navigate = useNavigate();

  const handleServiceTypeChange = (e: any) => {
    setServiceType(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const handleProductTypeChange = (e: any) => {
    setProductType(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleSubmit = (withoutFilter: boolean, pageNumber: number) => {
    const body = {
      pageNumber: pageNumber,
      recordsPerPage: 5,
      status: status,
      serviceTypeIds: serviceType,
      productIds: productType,
      consumerId: consumer,
      technicianId: TechnicianId,
    };
    withoutFilter && delete body.consumerId && delete body.productIds && delete body.serviceTypeIds && delete body.status;
    httpRequest
      .postRequest<IPageListOutputResult<IMissionsResultModel>>(`${APIURL_GET_TECHNICIAN_MISSIONS}`, body)
      .then((result) => {
        result.data.data.technicianMissionList && result.data.data.technicianMissionList.length > 0
          ? (setTechnicianMissionList(technicianMissionList?.concat(result.data.data.technicianMissionList)), setHasMore(true))
          : setHasMore(false);
      });
  };

  const GetServices = (cityId: number) => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<IServicesResultModel>>(`${APIURL_GET_SERVICES}?CityId=${cityId}`).then((result) => {
      setServices(result.data.data);
      setLoading(false);
    });
  };

  const GetConsumers = (TechnicianId: number) => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<ITechnicianConsumerResultModel>>(
        `${APIURL_GET_TECHNICIAN_CONSUMERS}?TechnicianId=${TechnicianId}`
      )
      .then((result) => {
        setConsumers(result.data.data);
        setLoading(false);
      });
  };

  const GetProductsType = () => {
    setLoading(true);
    httpRequest.getRequest<IOutputResult<IProductTypeFilterResultModel>>(`${APIURL_GET_PRODUCT_TYPES}`).then((result) => {
      setProductTypes(result.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setPageNumber(1);
    setHasMore(true);
    setWithout(true);
    handleSubmit(true, 1);
  }, []);
  useEffect(() => {
    GetProductsType();
    GetServices(cityId!);
    GetConsumers(TechnicianId!);
    init_template();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
      <div id="page">
        <PrevHeader />
        <div className="page-content" style={{ marginTop: '100px' }}>
          <div className="accordion mt-4" id="accordion-1">
            <div className="card card-style shadow-0 bg-highlight mb-1">
              <button
                className="btn accordion-btn color-white no-effect collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#collapse5"
              >
                <i className="fa fa-star me-2"></i>
                وضعیت سفارش <i className="fa fa-chevron-down font-10 accordion-icon"></i>
              </button>

              <div id="collapse5" className="bg-theme collapse" data-bs-parent="" style={{ backgroundColor: 'white' }}>
                <div className="pt-3 pb-3">
                  <p className="mb-0">
                    <Row className="m-2 justify-content-around">
                      <div className="form-check icon-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e: any) => {
                            e.target.checked ? status.push(1) : status.splice(status.indexOf(1), 1);
                          }}
                          id="check1"
                        />
                        <label className="form-check-label" htmlFor="check1">
                          درحال انجام
                        </label>
                        <i className="icon-check-1 fa fa-square color-gray-dark font-16"></i>
                        <i className="icon-check-2 fa fa-check-square font-16 color-highlight"></i>
                      </div>
                      <div className="form-check icon-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e: any) => {
                            e.target.checked ? status.push(2) : status.splice(status.indexOf(2), 1);
                          }}
                          id="check2"
                        />
                        <label className="form-check-label" htmlFor="check2">
                          معلق{' '}
                        </label>
                        <i className="icon-check-1 fa fa-square color-gray-dark font-16"></i>
                        <i className="icon-check-2 fa fa-check-square font-16 color-highlight"></i>
                      </div>
                    </Row>
                    <Row className="m-2 justify-content-around">
                      <div className="form-check icon-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e: any) => {
                            e.target.checked ? status.push(3) : status.splice(status.indexOf(3), 1);
                          }}
                          id="check3"
                        />
                        <label className="form-check-label" htmlFor="check3">
                          بسته{' '}
                        </label>
                        <i className="icon-check-1 fa fa-square color-gray-dark font-16"></i>
                        <i className="icon-check-2 fa fa-check-square font-16 color-highlight"></i>
                      </div>
                      <div className="form-check icon-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e: any) => {
                            e.target.checked ? status.push(4) : status.splice(status.indexOf(4), 1);
                          }}
                          id="check4"
                        />
                        <label className="form-check-label" htmlFor="check4">
                          ابطال{' '}
                        </label>
                        <i className="icon-check-1 fa fa-square color-gray-dark font-16"></i>
                        <i className="icon-check-2 fa fa-check-square font-16 color-highlight"></i>
                      </div>
                    </Row>
                    <div className="d-inline-flex m-1 justify-content-evenly" style={{ width: '100%' }}>
                      <div className="m-3">نوع خدمت</div>
                      <div style={{ minWidth: '250px' }}>
                        <Select
                          name="serviceTypes"
                          onChange={handleServiceTypeChange}
                          isMulti
                          options={services}
                          placeholder="انتخاب خدمت"
                        />
                      </div>
                    </div>
                    <div className="d-inline-flex m-1 justify-content-evenly" style={{ width: '100%' }}>
                      <div className="m-3">نوع محصول</div>
                      <div style={{ minWidth: '250px' }}>
                        <Select
                          name="productTypes"
                          onChange={handleProductTypeChange}
                          isMulti
                          options={productTypes}
                          placeholder="انتخاب محصول"
                        />
                      </div>
                    </div>
                    <div className="d-inline-flex m-1 justify-content-evenly" style={{ width: '100%' }}>
                      <div className="m-3">مشتری</div>
                      <div style={{ minWidth: '250px' }}>
                        <Select
                          isClearable
                          name="consumer"
                          onChange={(e: any) => (e ? setConsumer(e.value) : setConsumer(undefined))}
                          options={consumers}
                          placeholder="انتخاب مشتری"
                        />
                      </div>
                    </div>
                    <div className="d-flex m-2 justify-content-center">
                      <Button
                        onMouseDown={() => setTechnicianMissionList([])}
                        onClick={() => {
                          setPageNumber(1);
                          setHasMore(true);
                          setWithout(true);
                          handleSubmit(true, 1);
                        }}
                        className="m-2 btn btn-danger"
                        style={{ width: '45%' }}
                      >
                        بدون فیلترها
                      </Button>
                      <Button
                        onMouseDown={() => setTechnicianMissionList([])}
                        onClick={() => {
                          setPageNumber(1);
                          setHasMore(true);
                          setWithout(false);
                          handleSubmit(false, 1);
                        }}
                        className="m-2 btn btn-success"
                        style={{ width: '45%' }}
                      >
                        اعمال فیلتر
                      </Button>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px' }}>
              <Spinner style={{ width: '5rem', height: '5rem' }} />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={technicianMissionList?.length ? technicianMissionList?.length : 1}
              next={() => {
                setPageNumber(pageNumber + 1);
                handleSubmit(withoutFilter, pageNumber + 1);
              }}
              hasMore={hasMore!}
              loader={<h4 className="d-flex justify-content-center">درحال بارگذاری...</h4>}
            >
              {technicianMissionList &&
                technicianMissionList.length > 0 &&
                technicianMissionList.map((mission: ITechnicianMissionList, index: number) => {
                  return (
                    <>
                      <div className="card card-style shadow-0 bg-highlight mb-1">
                        <button
                          className="btn accordion-btn custom-accordion-btn  color-white no-effect"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                        >
                          <div style={{ marginBottom: '20px' }}>
                            شماره درخواست : <div>{mission.requestNumber}</div>
                            <div style={{ marginRight: 'auto' }}>{DateHelper.isoDateTopersian(mission.presenceDateTime)}</div>
                            {mission.isUrgent ? (
                              <div style={{ border: '2px solid red', color: 'red', marginRight: '10px' }}>مراجعه فوری</div>
                            ) : (
                              ''
                            )}
                          </div>

                          <div style={{ marginBottom: '5px' }}>
                            <div className="col-6">
                              {mission.serviceTypeTitle}-{mission.productTitle}
                            </div>
                            <div className="col-5">
                              <span className={IEStatusId[mission.statusId!]}>{mission.statusTitle}</span>
                            </div>
                          </div>
                          <div>{mission.address}</div>
                          <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div
                          style={{ backgroundColor: 'white' }}
                          id={`collapse${index}`}
                          className="collapse bg-theme custom-accordion-open"
                          data-bs-parent="#accordion-2"
                        >
                          <Button
                            onClick={() => navigate(`${URL_TECHNICIAN_MISSION_DETAIL}?id=${mission.requestDetailId}`)}
                            style={{ width: 'inherit' }}
                          >
                            جزئیات بیشتر
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default TechnicianMission;
