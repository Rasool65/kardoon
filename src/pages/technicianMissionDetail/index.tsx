import Form, { AjvError, IChangeEvent, ISubmitEvent, UiSchema } from '@rjsf/core';
import type { JSONSchema7 } from 'json-schema';
import {
  APIURL_GET_MISSION_ATTRIBUTES_DETAILS,
  APIURL_GET_MISSION_DETAILS,
  APIURL_GET_ORDER_DETAILS,
  APIURL_UPDATE_REQUEST_DETAIL_STATUS,
} from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import Footer from '@src/layout/Footer';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IEStatusId, IOrderListResultModel } from '@src/models/output/order/IOrderListResultModel';
import {
  IInvoice,
  IOrderDetailListResultModel,
  IProblemList,
  IDetails,
  ITechnicians,
} from '@src/models/output/orderDetail/IOrderDetailListResultModel';
import { RootStateType } from '@src/redux/Store';
import { CustomFunctions } from '@src/utils/custom';
import { DateHelper } from '@src/utils/dateHelper';
import { UtilsHelper } from '@src/utils/GeneralHelpers';
import { FunctionComponent, useEffect, useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import { IPageProps } from '../../configs/routerConfig/IPageProps';
import { URL_MY_ORDERS, URL_TECHNICIAN_MISSION_DETAIL_ACTION } from '../../configs/urls';
import { IMissionDetailResultModel } from '@src/models/output/missionDetail/IMissionDetailListResultModel';
import Select from 'react-select';
import { IAttributesResultModel } from '@src/models/output/missionDetail/IAttributesResultModel';
import { useToast } from './../../hooks/useToast';

const technicianMissionDetail: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const httpRequest = useHttpRequest();
  const [missionDetail, setMissionDetail] = useState<IMissionDetailResultModel>();
  const [genForm, setGenForm] = useState<IAttributesResultModel>();
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const userData = useSelector((state: RootStateType) => state.authentication.userData);
  const toast = useToast();
  const GetMissionDetail = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IMissionDetailResultModel>>(
        `${APIURL_GET_MISSION_DETAILS}?TechnicianId=${userData?.userId}&RequestDetailId=${id}`
      )
      .then((result) => {
        setMissionDetail(result.data.data);
        setLoading(false);
      });
  };
  const UpdateStatus = (statusValue: number) => {
    const body = {
      technicianId: userData?.userId,
      requestDetailId: parseInt(id!),
      status: statusValue,
    };
    setLoading(true);
    httpRequest.updateRequest<IOutputResult<any>>(`${APIURL_UPDATE_REQUEST_DETAIL_STATUS}`, body).then((result) => {
      toast.showSuccess(result.data.message);
      setLoading(false);
    });
  };
  const uiSchema = {
    'ui:readonly': true,
    // 'ui:widget': 'checkboxes',
  };

  const FormGenDetail = () => {
    setLoading(true);
    httpRequest
      .getRequest<IOutputResult<IAttributesResultModel>>(
        `${APIURL_GET_MISSION_ATTRIBUTES_DETAILS}?RequestDetailId=${id}&UserId=${userData?.userId}`
      )
      .then((result) => {
        setGenForm(result.data.data);
        setLoading(false);
      });
  };
  const option = [
    {
      label: 'باز',
      value: 0,
    },
    {
      label: 'در حال انجام',
      value: 1,
    },
    {
      label: 'معلق',
      value: 2,
    },
    {
      label: 'بسته',
      value: 3,
    },
    {
      label: 'ابطال',
      value: 4,
    },
  ];
  useEffect(() => {
    GetMissionDetail();
    FormGenDetail();
    CustomFunctions();
  }, []);
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return (
    <>
      <div id="page">
        {/* <Footer footerMenuVisible={true} activePage={1} /> */}
        <div className="page-content">
          <div className="page-title page-title-small">
            <h2>
              <a href="#" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-right mx-2"></i>
                بازگشت
              </a>
            </h2>
          </div>
          <div className="card header-card shape-rounded" data-card-height="150">
            <div className="card-overlay bg-highlight opacity-95"></div>
            <div className="card-overlay dark-mode-tint"></div>
            <div className="card-bg preload-img" data-src="images/pictures/20s.jpg"></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="section-1">
              <div className=" div-1">
                <div className=" details-bar">
                  <p>شماره درخواست:</p>
                  <p>{missionDetail?.requestNumber}</p>
                </div>
                <div className=" details-bar">
                  <p>زمان مراجعه:</p>
                  <p>
                    {DateHelper.isoDateTopersian(missionDetail?.presenceDateTime)}-{missionDetail?.presenceShift}
                  </p>
                </div>
                <div className=" details-bar">
                  <p>آدرس:</p>
                  <p>{missionDetail?.address}</p>
                </div>
              </div>
              <div className="div-2">
                <div
                  className=""
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '85%',
                    padding: '10px 0',
                  }}
                >
                  <span>
                    {missionDetail?.serviceTypeTitle}-{missionDetail?.productTypeTitle}
                  </span>
                  {missionDetail?.statusTitle && (
                    <Select
                      isLoading={loading}
                      className="select-city"
                      options={option}
                      placeholder={missionDetail?.statusTitle}
                      onChange={(e) => UpdateStatus(e?.value!)}
                    />
                  )}
                </div>
                <div className="" style={{ width: '90%', marginTop: '10px', padding: '10px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '150px' }}>
                    {/* Generate Form here */}
                    {genForm && (
                      <Form children={true} schema={genForm.attributes} formData={genForm.attributeValues} uiSchema={uiSchema} />
                    )}
                    <div>
                      <p style={{ marginBottom: '0' }}>ایرادات</p>
                      <ul>
                        {missionDetail?.problemList &&
                          missionDetail?.problemList.length > 0 &&
                          missionDetail.problemList.map((problems: IProblemList, index: number) => {
                            return <li>{problems.label}</li>;
                          })}
                      </ul>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center m-3">
                    <audio src={missionDetail?.audioMessage} controls />
                  </div>

                  <div style={{ display: 'block' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <video
                        width="320"
                        height="240"
                        controls
                        style={{ display: 'flex', alignContent: 'center' }}
                        src={missionDetail?.videoMessage}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'inherit', flexWrap: 'wrap' }}>
                      {missionDetail?.imageMessage &&
                        missionDetail?.imageMessage.length > 0 &&
                        missionDetail?.imageMessage.map((imageAddress: string, index: number) => {
                          return (
                            <img
                              style={{ maxWidth: '85px', cursor: 'pointer' }}
                              className="m-2"
                              onClick={() => {
                                setImageUrl(imageAddress);
                                setImageModalVisible(true);
                              }}
                              src={imageAddress}
                            />
                          );
                        })}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      width: '50%',
                      margin: '0 auto',
                    }}
                  >
                    <span className="contact">
                      <i
                        className="fa-solid fa-location-crosshairs"
                        onClick={() =>
                          navigate(`${URL_TECHNICIAN_MISSION_DETAIL_ACTION}`, {
                            state: {
                              requestDetailId: missionDetail?.requestDetailId,
                              productCategoryId: missionDetail?.productCategoryId,
                            },
                          })
                        }
                      />
                    </span>
                    <span className="contact">
                      <i className="fa fa-phone" />
                    </span>
                    {/* <span className="contact">
                      <i className="fa fa-paperclip" />
                    </span>
                    <span className="contact">
                      <i className="fa fa-message" />
                    </span> */}
                  </div>
                </div>
                <Button className="btn btn-success" style={{ marginBottom: '100px', width: '90%' }}>
                  ذخیره
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`menu menu-box-modal rounded-m ${imageModalVisible ? 'menu-active' : ''}`}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundRepeat: 'round',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
          data-menu-height="cover"
          data-menu-width="cover"
          onClick={() => setImageModalVisible(false)}
        />
      </div>
    </>
  );
};

export default technicianMissionDetail;
