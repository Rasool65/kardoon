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
import { generatePath, useNavigate } from 'react-router-dom';
import { IEStatusId } from '@src/models/output/order/IOrderListResultModel';
import { URL_TECHNICIAN_MISSION_DETAIL, URL_TECHNICIAN_FACTOR } from '@src/configs/urls';
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
  const [status, setStatus] = useState<any>([1, 5]);
  const navigate = useNavigate();

  const handleServiceTypeChange = (e: any) => {
    setServiceType(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const handleProductTypeChange = (e: any) => {
    setProductType(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const handleStatusChange = (e: any) => {
    setStatus(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const statusList = [
    { label: 'تخصیص یافته', value: 1 },
    { label: 'منتظر لغو', value: 2 },
    { label: 'بسته', value: 3 },
    { label: 'ابطال', value: 4 },
    { label: 'در حال بررسی', value: 5 },
  ];
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
    setWithout(false);
    handleSubmit(false, 1);
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
      <div id="page" className="technician-mission-page">
        <PrevHeader />
        <div className="page-content">
          <div className="accordion mt-4 fillter-box" id="accordion-1">
            <div className="fillter-main-btn card card-style shadow-0 bg-highlight mb-1">
              <button
                className="btn accordion-btn color-white no-effect collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#collapse5"
              >
                <i className="fa fa-star me-2"></i>
                وضعیت سفارش <i className="fa fa-chevron-down font-10 accordion-icon"></i>
              </button>

              <div
                id="collapse5"
                className="filter-body bg-theme collapse"
                data-bs-parent=""
                style={{ backgroundColor: 'white' }}
              >
                <div className="filter-body-content pt-3 pb-3">
                  <p className="mb-0">
                    <div className="d-inline-flex m-1 justify-content-evenly" style={{ width: '100%' }}>
                      <div className="m-3">وضعیت</div>
                      <div className="input-width" style={{ minWidth: '150px' }}>
                        <Select
                          name="statusType"
                          onChange={handleStatusChange}
                          isMulti
                          options={statusList}
                          placeholder="انتخاب وضعیت"
                        />
                      </div>
                    </div>
                    <div className="d-inline-flex m-1 justify-content-evenly" style={{ width: '100%' }}>
                      <div className="m-2">نوع خدمت</div>
                      <div className="input-width" style={{ minWidth: '150px' }}>
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
                      <div className="m-2">نوع محصول</div>
                      <div className="input-width" style={{ minWidth: '150px' }}>
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
                      <div className="input-width" style={{ minWidth: '150px' }}>
                        <Select
                          isClearable
                          name="consumer"
                          onChange={(e: any) => (e ? setConsumer(e.value) : setConsumer(undefined))}
                          options={consumers}
                          placeholder="انتخاب مشتری"
                        />
                      </div>
                    </div>
                    <div className="flex-column mt-20">
                      <Button
                        onMouseDown={() => setTechnicianMissionList([])}
                        onClick={() => {
                          setPageNumber(1);
                          setHasMore(true);
                          setWithout(true);
                          handleSubmit(true, 1);
                        }}
                        className="fillter-btn m-2 btn btn-danger"
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
                        className="fillter-btn m-2 btn btn-success"
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
                      <div className="cart-box card card-style shadow-0 bg-highlight mb-1">
                        <button
                          className="btn accordion-btn custom-accordion-btn  color-white no-effect"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                        >
                          <div className="cart-header">
                            <div className="cart-bar">
                              <div className="mission-title">
                                {mission.serviceTypeTitle}-{mission.productTitle}
                              </div>

                              <div className="mission-date">{DateHelper.isoDateTopersian(mission.presenceDateTime)}</div>
                            </div>

                            <div className="cart-bar">
                              <div className="cart-subtitle">
                                <div>وضعیت :</div>
                                <div className="mission-condition">
                                  <span className={IEStatusId[mission.statusId!]}>{mission.statusTitle}</span>
                                </div>
                              </div>

                              <div className="mission-position">{mission.address}</div>
                            </div>
                          </div>

                          <div className="cart-body">
                            <div className="cart-bar">
                              <div className="cart-subtitle">
                                <span> شماره درخواست :</span>
                                <div>{mission.requestNumber}</div>
                              </div>
                              <div className="mission-condition">
                                {mission.isUrgent ? <div className="force-reject">SOS</div> : ''}
                              </div>
                            </div>
                            <div className="cart-bar">
                              <div style={{ color: 'black' }}>
                                {mission.consumerFirstName} {mission.consumerLastName}
                              </div>
                              <div>
                                <i className="fa fa-chevron-down font-10 accordion-icon"></i>
                              </div>
                            </div>
                          </div>
                        </button>

                        <div
                          style={{ backgroundColor: 'white' }}
                          id={`collapse${index}`}
                          className="collapse bg-theme custom-accordion-open"
                          data-bs-parent="#accordion-2"
                        >
                          <div className="d-flex justify-content-between more-data-btn">
                            <Button
                              onClick={() => navigate(`${URL_TECHNICIAN_MISSION_DETAIL}?id=${mission.requestDetailId}`)}
                              style={{ width: '100%', borderRadius: 0 }}
                            >
                              جزئیات بیشتر
                            </Button>
                            {mission.statusTitle == 'بسته' && (
                              <Button
                                // onClick={() =>
                                //   navigate(
                                //     `${URL_TECHNICIAN_FACTOR}?requestDetailId=${mission.requestDetailId}&technicianId=${TechnicianId}`
                                //   )
                                // }
                                onClick={() => navigate(generatePath(URL_TECHNICIAN_FACTOR, { id: mission.guid }))}
                                style={{ width: '50%', borderRadius: 0 }}
                              >
                                مشاهده فاکتور{' '}
                              </Button>
                            )}
                          </div>
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
